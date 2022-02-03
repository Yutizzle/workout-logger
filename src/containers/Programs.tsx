import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFilter, useSelect, useUpsert } from 'react-supabase';
import { Picker } from '@react-native-picker/picker';
import CommonStyles from '../styles/Common';
import { HeaderBackOnly } from '../components/Header';
import useAuth from '../hooks/useAuth';

type ProgramList = {
  program_id: number;
  program_name: string;
  users: string[];
};

type UserProgram = {
  program_id: number;
  program_run: number;
};

type FirstWorkoutId = {
  workout_id: number;
};

type ProgramRun = {
  program_run: number;
};

function ProgramsScreen() {
  const { user } = useAuth();
  const [programList, setProgramList] = useState<ProgramList[]>([]);
  const [selectedProgramId, setSelectedProgramId] = useState(0);
  const [currUserProgramId, setCurrUserProgramId] = useState(0);
  const [firstWorkoutId, setFirstWorkoutId] = useState(0);
  const [lastProgramRun, setLastProgramRun] = useState(0);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const userIdFilter = useFilter((query) => query.eq('user_id', user?.id), [user?.id]);

  // get all programs
  const [programs] = useSelect<ProgramList>('program', {
    columns: `
            program_id:id,
            program_name,
            users:user_program(user_id)
        `,
    options: { count: 'exact' },
  });

  // get user's current program
  const [userProgram] = useSelect<UserProgram>('user_program', {
    columns: 'program_id, program_run',
    filter: userIdFilter,
    pause: user?.id === null,
    options: { count: 'exact' },
  });

  // get first workout in current program
  const firstWorkoutFilter = useFilter(
    (query) => query.eq('sequence_num', 0).eq('program_id', selectedProgramId),
    [selectedProgramId]
  );
  const [firstWorkout] = useSelect<FirstWorkoutId>('program_detail', {
    columns: 'workout_id',
    filter: firstWorkoutFilter,
    pause: selectedProgramId === 0,
    options: { count: 'exact' },
  });

  // get last program run for selected program
  const programRunFilter = useFilter(
    (query) =>
      query.eq('program_id', selectedProgramId).order('created_at', { ascending: false }).limit(1),
    [selectedProgramId]
  );
  const [programRun] = useSelect<ProgramRun>('user_workout_history', {
    columns: 'program_run',
    filter: programRunFilter,
    pause: selectedProgramId === 0,
    options: { count: 'exact' },
  });

  // update or insert user's current program
  const [upsertState, upsertUserProgram] = useUpsert('user_program', {
    options: { onConflict: 'user_id' },
  });

  // init program list and user's current program
  useEffect(() => {
    if (!programs.fetching && programs.count && programs.data) {
      if (programs.count > 0) {
        setProgramList(programs.data);
      }
    }
    if (!userProgram.fetching && userProgram.count && userProgram.data) {
      if (userProgram.count > 0) {
        const data = userProgram.data[0];
        setCurrUserProgramId(data.program_id);
      }
    }

    return () => {};
  }, [
    programs.fetching,
    programs.count,
    programs.data,
    userProgram.fetching,
    userProgram.count,
    userProgram.data,
  ]);

  // init selected program
  useEffect(() => {
    setSelectedProgramId(currUserProgramId);
  }, [currUserProgramId]);

  // init first workout in selected program
  useEffect(() => {
    if (!firstWorkout.fetching && firstWorkout.count && firstWorkout.data) {
      if (firstWorkout.count > 0) {
        setFirstWorkoutId(firstWorkout.data[0].workout_id);
      }
    }
  }, [firstWorkout.fetching, firstWorkout.count, firstWorkout.data]);

  // init last program run in selected program
  useEffect(() => {
    // console.log(programRun);
    if (!programRun.fetching && programRun.count && programRun.data) {
      if (programRun.count > 0) {
        setLastProgramRun(programRun.data[0].program_run);
      } else {
        setLastProgramRun(0);
      }
    }
  }, [programRun.fetching, programRun.count, programRun.data]);

  // save current program
  const onSave = async (programId: number, programRunId: number, workoutId: number) => {
    // disable all buttons
    setButtonDisabled(true);

    if (programId > 0 && programId !== currUserProgramId) {
      // upsert selected program id into user_program
      const res = await upsertUserProgram({
        user_id: user?.id,
        program_id: programId,
        current_workout_id: workoutId,
        current_program_cycle: 1,
        program_run: programRunId + 1,
        created_by: user?.id,
        updated_by: user?.id,
        updated_at: new Date(),
      });

      // log errors
      if (upsertState.error) {
        // console.log(upsertState.error);
      } else {
        // update current program id state
        setCurrUserProgramId(res.data[0].program_id);
      }
    }

    // enable all buttons
    setButtonDisabled(false);
  };

  // reset current program cycle
  const resetProgramCycle = async (programId: number, programRunId: number, workoutId: number) => {
    // disable all buttons
    setButtonDisabled(true);

    if (programId > 0) {
      // upsert current_program_cycle = 1 into user_program
      await upsertUserProgram({
        user_id: user?.id,
        program_id: programId,
        current_workout_id: workoutId,
        current_program_cycle: 1,
        current_program_run: programRunId + 1,
        created_by: user?.id,
        updated_by: user?.id,
        updated_at: new Date(),
      });

      // log errors
      if (upsertState.error) {
        // console.log(upsertState.error);
      }
    }

    // enable all buttons
    setButtonDisabled(false);
  };

  // confirmation alert before reset
  const onReset = (programId: number, programRunId: number, workoutId: number) => {
    // disable all buttons
    setButtonDisabled(true);

    // get program name
    const program = programList.find((data) => data.program_id === programId);

    Alert.alert(
      'Reset Program Cycle',
      `Are you sure you want to reset the current program cycle for ${program?.program_name}?`,
      [
        {
          text: 'Cancel',
          onPress: () => {
            // enable all buttons
            setButtonDisabled(false);
          },
        },
        {
          text: 'OK',
          onPress: async () => {
            await resetProgramCycle(programId, programRunId, workoutId);
          },
        },
      ]
    );
  };

  return (
    <View style={CommonStyles.viewContainer}>
      <StatusBar />
      <HeaderBackOnly headerTitle="My Programs" />
      {/* Workout */}
      <ScrollView contentContainerStyle={CommonStyles.flexGrow}>
        <View style={[CommonStyles.viewContainer, CommonStyles.padding10]}>
          <Text style={[CommonStyles.headerTitle, CommonStyles.flexShrink]}>Current Program:</Text>
          <Picker
            style={CommonStyles.flexShrink}
            selectedValue={selectedProgramId}
            onValueChange={(id) => {
              setSelectedProgramId(id);
            }}
          >
            {programList.map((program) => (
              <Picker.Item
                key={program.program_name}
                label={program.program_name}
                value={program.program_id}
              />
            ))}
          </Picker>
          <View
            style={[CommonStyles.flexDirectionColumn, CommonStyles.flexGrow, CommonStyles.flexEnd]}
          >
            {userProgram.data && (
              <TouchableOpacity
                style={[
                  CommonStyles.buttons,
                  CommonStyles.buttonsSecondary,
                  CommonStyles.flexShrink,
                ]}
                disabled={buttonDisabled}
                onPress={async () => {
                  await onReset(currUserProgramId, lastProgramRun, firstWorkoutId);
                }}
              >
                {upsertState.fetching ? (
                  <ActivityIndicator size="small" color="#284b63" />
                ) : (
                  <Text style={[CommonStyles.buttonText, CommonStyles.textDark]}>
                    Reset Current Program Cycle
                  </Text>
                )}
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={[CommonStyles.buttons, CommonStyles.buttonsPrimary, CommonStyles.flexShrink]}
              disabled={buttonDisabled}
              onPress={async () => {
                await onSave(selectedProgramId, lastProgramRun, firstWorkoutId);
              }}
            >
              {upsertState.fetching ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={[CommonStyles.buttonText, CommonStyles.textLight]}>Save</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default ProgramsScreen;
