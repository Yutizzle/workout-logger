import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useFilter, useSelect, useUpdate, useUpsert } from 'react-supabase';

import { HeaderBackOnly } from '../components/Header';
import useAuth from '../hooks/useAuth';
import CommonStyles from '../styles/Common';
import { ProgramsScreenNavigationProp } from '../types';

type ProgramList = {
  program_id: number;
  program_name: string;
  users: string[];
};

type UserProgramId = {
  program_id: number;
};

type FirstWorkoutId = {
  workout_id: number;
};

type ProgramRun = {
  program_run: number;
};

type OpenWorkout = {
  id: number;
};

function ProgramsScreen({ navigation }: ProgramsScreenNavigationProp) {
  const { user } = useAuth();
  const [programList, setProgramList] = useState<ProgramList[]>([]);
  const [selectedProgramId, setSelectedProgramId] = useState(0);
  const [currUserProgramId, setCurrUserProgramId] = useState(0);
  const [firstWorkoutId, setFirstWorkoutId] = useState(0);
  const [lastProgramRun, setLastProgramRun] = useState(0);
  const [openWorkoutIdList, setOpenWorkoutIdList] = useState<OpenWorkout[]>([]);
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
  const [userProgram] = useSelect<UserProgramId>('user_program', {
    columns: 'program_id',
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

  const openWorkoutFilter = useFilter(
    (query) => query.eq('user_id', user?.id).is('end_time', null),
    [user?.id]
  );
  const [openWorkout] = useSelect<OpenWorkout>('user_workout_history', {
    columns: 'id',
    filter: openWorkoutFilter,
    options: { count: 'exact' },
  });
  const [, closeOpenWorkouts] = useUpdate('user_workout_history');

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

  // init open workout id list for current user
  useEffect(() => {
    if (!openWorkout.fetching && openWorkout.count && openWorkout.data) {
      if (openWorkout.count > 0) {
        setOpenWorkoutIdList(openWorkout.data);
      }
    }
  }, [openWorkout.fetching, openWorkout.count, openWorkout.data]);

  // save current program
  const onSave = async (
    programId: number,
    programRunId: number,
    workoutId: number,
    openWorkoutIds: OpenWorkout[]
  ) => {
    // disable all buttons
    setButtonDisabled(true);

    if (programId > 0 && programId !== currUserProgramId) {
      // check if there is an open/started workout and close it
      if (openWorkoutIds.length > 0) {
        openWorkoutIds.forEach(async (workout) => {
          await closeOpenWorkouts({ end_time: new Date() }, (query) => query.eq('id', workout.id));
        });
      }

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
    } else if (programId === 0) {
      Alert.alert('No Program Selected', `Please select a program before saving.`, [
        {
          text: 'OK',
        },
      ]);
    }

    // enable all buttons
    setButtonDisabled(false);
  };

  // reset current program cycle
  const resetProgramCycle = async (
    programId: number,
    programRunId: number,
    workoutId: number,
    openWorkoutIds: OpenWorkout[]
  ) => {
    // disable all buttons
    setButtonDisabled(true);

    if (programId > 0) {
      // check if there is an open/started workout and close it
      if (openWorkoutIds.length > 0) {
        openWorkoutIds.forEach(async (workout) => {
          await closeOpenWorkouts(
            { end_time: new Date(), updated_at: new Date(), updated_by: user?.id },
            (query) => query.eq('id', workout.id)
          );
        });
      }

      // upsert current_program_cycle = 1 into user_program
      await upsertUserProgram({
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
      }
    }

    // enable all buttons
    setButtonDisabled(false);
  };

  // confirmation alert before reset
  const onReset = (
    programId: number,
    programRunId: number,
    workoutId: number,
    openWorkoutIds: OpenWorkout[]
  ) => {
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
          text: 'Reset',
          style: 'destructive',
          onPress: async () => {
            await resetProgramCycle(programId, programRunId, workoutId, openWorkoutIds);
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
          <View
            style={[
              CommonStyles.flexDirectionRow,
              CommonStyles.alignCenter,
              CommonStyles.flexShrink,
            ]}
          >
            <Text style={[CommonStyles.headerTitle, CommonStyles.flexShrink]}>
              Current Program:
            </Text>
            <View
              style={[CommonStyles.flexDirectionRow, CommonStyles.flexGrow, CommonStyles.flexEnd]}
            >
              <TouchableOpacity
                style={[CommonStyles.flexEndSelf, CommonStyles.padding6]}
                disabled={buttonDisabled}
                onPress={async () => {
                  navigation.navigate('NewProgramScreen');
                }}
              >
                <MaterialCommunityIcons name="plus" style={CommonStyles.headerIcons} />
              </TouchableOpacity>
              <TouchableOpacity
                style={[CommonStyles.flexEndSelf, CommonStyles.padding6]}
                disabled={buttonDisabled}
                onPress={async () => {}}
              >
                <MaterialCommunityIcons name="pencil" style={CommonStyles.headerIcons} />
              </TouchableOpacity>
            </View>
          </View>
          <Picker
            style={CommonStyles.flexShrink}
            selectedValue={selectedProgramId}
            onValueChange={(id) => {
              setSelectedProgramId(id);
            }}
          >
            <Picker.Item key="--" label="--" value={0} />
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
            {currUserProgramId > 0 && (
              <TouchableOpacity
                style={[
                  CommonStyles.buttons,
                  CommonStyles.buttonsSecondary,
                  CommonStyles.flexShrink,
                ]}
                disabled={buttonDisabled}
                onPress={async () => {
                  await onReset(
                    currUserProgramId,
                    lastProgramRun,
                    firstWorkoutId,
                    openWorkoutIdList
                  );
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
                await onSave(selectedProgramId, lastProgramRun, firstWorkoutId, openWorkoutIdList);
              }}
            >
              {buttonDisabled ? (
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
