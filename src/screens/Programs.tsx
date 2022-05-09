import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { getAllPrograms } from '../api/programs';
import { getUserProgram, updateUserProgram } from '../api/users';
import { HeaderBackOnly } from '../components/Header';
import useAuth from '../hooks/useAuth';
import CommonStyles from '../styles/Common';
import { Program, ProgramsScreenNavigationProp } from '../types';

type FirstWorkoutId = {
  workout_id: number;
};

type ProgramRun = {
  program_run: number;
};

type OpenWorkout = {
  id: number;
};

const initProgram: Program = {
  programId: 0,
  programName: '',
  totalCycleDays: 0,
};

function ProgramsScreen({ navigation }: ProgramsScreenNavigationProp) {
  const { user } = useAuth();
  const [programList, setProgramList] = useState<Program[]>([]);
  const [selectedProgramId, setSelectedProgramId] = useState(0);
  const [currUserProgram, setCurrUserProgram] = useState<Program>(initProgram);
  // const [firstWorkoutId, setFirstWorkoutId] = useState(0);
  // const [lastProgramRun, setLastProgramRun] = useState(0);
  // const [openWorkoutIdList, setOpenWorkoutIdList] = useState<OpenWorkout[]>([]);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  // init program list and user's current program
  useEffect(() => {
    const cancelToken = axios.CancelToken;
    const source = cancelToken.source();
    let isUnmounting = false;

    // get first workout in current program
    const asyncGetPrograms = async () => {
      // disable all buttons
      setButtonDisabled(true);

      // get all programs
      const programs = await getAllPrograms(source);

      if (!isUnmounting) {
        // set program list
        setProgramList(programs);

        // enable all buttons
        setButtonDisabled(false);
      }
    };

    const asyncGetUserProgram = async () => {
      // disable all buttons
      setButtonDisabled(true);

      // get user's current program
      const program = await getUserProgram(source, user?.id ?? '');

      if (!isUnmounting) {
        // set current program id
        setCurrUserProgram(program);

        // enable all buttons
        setButtonDisabled(false);
      }
    };

    asyncGetPrograms();
    asyncGetUserProgram();

    // cleanup
    return () => {
      source.cancel();
      isUnmounting = true;
    };
  }, [user?.id]);

  // init selected program
  useEffect(() => {
    let isUnmounting = false;

    if (!isUnmounting) setSelectedProgramId(currUserProgram.programId);

    // cleanup
    return () => {
      isUnmounting = true;
    };
  }, [currUserProgram.programId]);

  // save current program
  const onSave = async (programId: number) => {
    // disable all buttons
    setButtonDisabled(true);

    if (user && programId > 0 && programId !== currUserProgram.programId) {
      // update user with program id
      const resProgramId = await updateUserProgram(user?.id, programId);
      setCurrUserProgram((prev) => ({ ...prev, programId: resProgramId }));
    } else if (programId === 0) {
      Alert.alert('No Program Selected', `Please select a program before saving.`, [
        {
          text: 'OK',
          onPress: () => {
            // enable all buttons
            setButtonDisabled(false);
          },
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
    /*
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
    */
  };

  // confirmation alert before reset
  const onReset = (
    programId: number,
    programRunId: number,
    workoutId: number,
    openWorkoutIds: OpenWorkout[]
  ) => {
    /*
    // disable all buttons
    setButtonDisabled(true);

    // get program name
    const program = programList.find((data) => data.id === programId);

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
    */
  };

  return (
    <SafeAreaView style={[CommonStyles.flex, CommonStyles.backgroundColor, CommonStyles.padding10]}>
      <View style={[CommonStyles.viewContainer]}>
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
                  key={program.programId}
                  label={program.programName}
                  value={program.programId}
                />
              ))}
            </Picker>

            <View
              style={[
                CommonStyles.flexDirectionColumn,
                CommonStyles.flexGrow,
                CommonStyles.flexEnd,
              ]}
            >
              {currUserProgram.programId > 0 &&
                currUserProgram.programId === selectedProgramId &&
                currUserProgram.currentProgramCycle &&
                currUserProgram.currentProgramCycle > 0 && (
                  <TouchableOpacity
                    style={[
                      CommonStyles.buttons,
                      CommonStyles.buttonsSecondary,
                      CommonStyles.flexShrink,
                    ]}
                    disabled={buttonDisabled}
                    onPress={async () => {
                      await onReset(
                        currUserProgram.programId,
                        lastProgramRun,
                        firstWorkoutId,
                        openWorkoutIdList
                      );
                    }}
                  >
                    {buttonDisabled ? (
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
                  await onSave(selectedProgramId);
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
    </SafeAreaView>
  );
}

export default ProgramsScreen;
