import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { useInsert } from 'react-supabase';

import { DraggableConfigList, HeaderBackOnly, SectionHeader } from '../components';
import useAuth from '../hooks/useAuth';
import {
  addWorkout,
  removeWorkout,
  resetWorkouts,
  updateWorkouts,
} from '../slices/NewProgramSlice';
import { RootState } from '../store';
import CommonStyles from '../styles/Common';
import { NewProgramScreenNavigationProp } from '../types';

interface WorkoutId {
  id: number;
  key: string;
  workout_name: string;
  created_by: string;
}

export default function NewProgramScreen({ navigation }: NewProgramScreenNavigationProp) {
  const { user } = useAuth();
  const workouts = useSelector((state: RootState) => state.newProgramWorkouts.workouts);
  const program = useSelector((state: RootState) => state.newProgramWorkouts);
  const dispatch = useDispatch();
  const [programName, setProgramName] = useState('');
  const [refresh, toggleRefresh] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const [programState, insertProgram] = useInsert('program');
  const [programDetailState, insertProgramDetail] = useInsert('program_detail');
  const [workoutState, insertWorkout] = useInsert<WorkoutId>('workout');
  // const [workoutExerciseState, insertWorkoutExercise] = useInsert('workout');

  const createNewProgram = async () => {
    // disable all buttons
    setButtonDisabled(true);

    // validate program name
    if (programName === '') {
      Alert.alert('Empty Program Name', `Your program does not have a name.`, [
        {
          text: 'OK',
          onPress: () => {
            // enable all buttons
            setButtonDisabled(false);
          },
        },
      ]);
      return;
    }
    // validate workouts, exercises, and sets exist
    if (program.workouts.length > 0 && program.exercises.length > 0 && program.sets.length > 0) {
      // insert program
      await insertProgram({
        program_name: programName,
        total_cycle_days: program.workouts.length,
        created_by: user?.id,
      });
      console.log('program', programState.data);
      const programId = programState.data.id;
      if (programState.error) {
        console.error(programState.error);
        return;
      }

      // insert workouts
      await insertWorkout(
        program.workouts.map((workout) => ({ workout_name: workout.label, created_by: user?.id }))
      );
      if (workoutState.error) {
        console.error(workoutState.error);
        return;
      }
      console.log('workout', workoutState.data);
      if (workoutState.data) {
        const workoutIds = workoutState.data;
        workoutIds.forEach((item, idx) => {
          item.key = workoutIds[idx].id;
        });
      }
      console.log('workouts', workouts);
      // insert program_detail
      await insertProgramDetail(
        program.workouts.map((item, idx) => ({
          program_id: programId,
          workout_id: workoutIds[idx],
          sequence_num: item.index,
          cycle_day_num: item.index + 1,
          created_by: user?.id,
        }))
      );

      console.log('program_detail', programDetailState.data);

      if (programDetailState.error) {
        console.error(programDetailState.error);
        return;
      }

      // insert workout_exercise
      // await insertWorkoutExercise(program.exercises.map((item) => {}));
    }
  };
  const addNewWorkout = (idx: number) => {
    // disable buttons
    setButtonDisabled(true);

    // update store
    dispatch(addWorkout({ workoutIndex: idx }));

    // refresh grid
    toggleRefresh((prev) => !prev);

    // enable buttons
    setButtonDisabled(false);
  };

  const removeNewWorkout = (idx: number) => {
    // disable all buttons
    setButtonDisabled(true);

    // must have at least one workout, cannot remove last workout
    if (workouts.length === 1) {
      Alert.alert('Remove Workout', `Your program must contain at least one workout.`, [
        {
          text: 'OK',
          onPress: () => {
            // enable all buttons
            setButtonDisabled(false);
          },
        },
      ]);
    } else {
      Alert.alert(
        'Remove Workout',
        `Are you sure you want to remove ${workouts[idx].label} from this program?`,
        [
          {
            text: 'Cancel',
            onPress: () => {
              // enable all buttons
              setButtonDisabled(false);
            },
          },
          {
            text: 'Remove',
            style: 'destructive',
            onPress: () => {
              // remove selected workout
              dispatch(removeWorkout(idx));

              // refresh flatlist
              toggleRefresh((prev) => !prev);

              // enable all buttons
              setButtonDisabled(false);
            },
          },
        ]
      );
    }
  };

  const onGoBack = () => {
    // disable all buttons
    setButtonDisabled(true);

    Alert.alert(
      'Leave New Program',
      `Are you sure you want to leave without saving this program?`,
      [
        {
          text: 'Cancel',
          onPress: () => {
            // enable all buttons
            setButtonDisabled(false);
          },
        },
        {
          text: 'Leave',
          style: 'destructive',
          onPress: () => {
            dispatch(resetWorkouts());
            navigation.navigate('ProgramsScreen');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={[CommonStyles.flex, CommonStyles.backgroundColor, CommonStyles.padding10]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={[CommonStyles.viewContainer]}
      >
        <TouchableWithoutFeedback
          containerStyle={[CommonStyles.flex, CommonStyles.flexGrow]}
          style={[CommonStyles.flex, CommonStyles.flexGrow]}
          onPress={Keyboard.dismiss}
        >
          {/* Status Bar */}
          <StatusBar />
          <HeaderBackOnly headerTitle="Create New Program" onGoBack={onGoBack} />
          <View style={[CommonStyles.padding10, CommonStyles.flexShrink]}>
            <SectionHeader title="Program Name" />
            <View style={CommonStyles.padding6}>
              <View style={CommonStyles.inputContainer}>
                <TextInput
                  style={[CommonStyles.inputs, CommonStyles.flex]}
                  placeholder="Program Name"
                  value={programName}
                  onChangeText={(name) => setProgramName(name)}
                />
              </View>
            </View>
            <SectionHeader title="Workouts" />
            <View style={[CommonStyles.paddingTop6, CommonStyles.alignCenter]}>
              <Text style={[CommonStyles.placeholderText]}>(Press & hold to re-order)</Text>
            </View>
          </View>
          <View style={[CommonStyles.flexGrow, CommonStyles.flexBasis0]}>
            <DraggableConfigList
              flatListData={workouts}
              refresh={refresh}
              setData={(data) => {
                dispatch(updateWorkouts(data));
              }}
              addItem={addNewWorkout}
              removeItem={removeNewWorkout}
              goToSettings={(item) => {
                navigation.navigate('EditWorkoutScreen', {
                  workoutIndex: item.index,
                });
              }}
            />
          </View>
        </TouchableWithoutFeedback>
        <View style={[CommonStyles.flexShrink]}>
          <TouchableOpacity
            style={[CommonStyles.buttons, CommonStyles.buttonsPrimary]}
            disabled={buttonDisabled}
            onPress={async () => {
              await createNewProgram();
            }}
          >
            <Text style={[CommonStyles.buttonText, CommonStyles.textLight]}>Create</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
