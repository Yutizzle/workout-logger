import React, { useState } from 'react';
import { KeyboardAvoidingView, Text, Platform, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSelect, useFilter, useUpdate } from 'react-supabase';
import { ScrollView } from 'react-native-gesture-handler';
import useAuth from '../hooks/useAuth';
import { CompletedSets, WorkoutExecutionData, WorkoutScreenNavigationProp } from '../types';
import CommonStyles from '../styles/Common';
import { HeaderBackAndMenu, WorkoutTodo } from '../components';

function WorkoutScreen({ navigation, route }: WorkoutScreenNavigationProp) {
  // get AuthContext
  const { user } = useAuth();
  const [workoutData, setWorkoutData] = useState<WorkoutExecutionData[]>(route.params.workout_data);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  // hook for updating user_workout_history
  const [, executeUpdateWorkout] = useUpdate('user_workout_history', {
    filter: (query) => query.eq('id', route.params.workout_history_id),
  });

  // hook for updating user_program
  const [, executeUpdateProgram] = useUpdate('user_program', {
    filter: (query) => query.eq('program_id', route.params.program_id),
  });

  // hook for selecting from user_exercise_history
  const filter = useFilter(
    (query) => query.eq('user_workout_history_id', route.params.workout_history_id),
    [route.params.workout_history_id]
  );
  const [, getCompletedSets] = useSelect<CompletedSets>('user_exercise_history', {
    columns: `
            workout_id,
            exercise,
            set_completed,
            reps_completed,
            set_duration_completed,
            weight,
            user_workout_history_id
        `,
    filter,
  });

  const updateCompletedExercises = (completedSets: CompletedSets[]) => {
    // apply completed sets to workout_data
    const executionData = workoutData.map((set) => {
      const completed = completedSets.find(
        (c) => c.exercise === set.exercise && c.set_completed === set.set
      );

      if (completed) {
        return {
          ...set,
          completed: true,
          reps_completed: completed.reps_completed,
          weight_completed: completed.weight,
          set_duration_completed: completed.set_duration_completed,
        };
      }
      return set;
    });

    setWorkoutData(executionData);

    return executionData;
  };

  const completeWorkout = async () => {
    setButtonDisabled(true);

    // validate completed sets with database
    const completedSets = await getCompletedSets();
    let workoutSetData: WorkoutExecutionData[] = [];

    if (completedSets?.data) {
      workoutSetData = updateCompletedExercises(completedSets?.data);
    } else if (completedSets?.error) {
      // console.log('error:', completedSets.error);
    }

    // get exercise set not completed yet
    let allSetsCompleted = true;
    const exerciseNotCompleted = { exercise: '', set: 0 };
    workoutSetData.forEach((set) => {
      if (!set.completed && exerciseNotCompleted.exercise === '') {
        allSetsCompleted = false;
        exerciseNotCompleted.exercise = set.exercise;
        exerciseNotCompleted.set = set.set;
      }
    });

    // update database tables if all sets are completed
    if (allSetsCompleted) {
      const now = new Date();
      const update = await executeUpdateWorkout({
        end_time: now,
        updated_at: now,
        updated_by: user?.id,
      });

      if (update.error) {
        // console.log('error: ', update.error);
      } else {
        const updateState = await executeUpdateProgram({
          current_workout_id: route.params.next_workout_id,
          current_program_cycle: route.params.next_program_cycle,
          updated_at: new Date(),
          updated_by: user?.id,
        });

        if (updateState.error) {
          // console.log('error: ', updateState.error);
        } else {
          navigation.goBack();
        }
      }
    } else {
      Alert.alert(
        'All Exercises Not Completed',
        `You have not completed exercise: ${exerciseNotCompleted.exercise}, set: ${exerciseNotCompleted.set}!`,
        [
          {
            text: 'OK',
          },
        ]
      );
    }

    setButtonDisabled(true);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={CommonStyles.viewContainer}
    >
      <StatusBar />
      <HeaderBackAndMenu headerTitle={route.params.workout_name} />
      <ScrollView contentContainerStyle={[CommonStyles.flexGrow, CommonStyles.padding10]}>
        <WorkoutTodo data={workoutData} setWorkoutDataHandler={setWorkoutData} />
        {/* Complete Workout Button */}
        <TouchableOpacity
          style={[CommonStyles.buttons, CommonStyles.buttonsPrimary]}
          disabled={buttonDisabled}
          onPress={async () => {
            await completeWorkout();
          }}
        >
          <Text style={[CommonStyles.buttonText, CommonStyles.textLight]}>Complete Workout</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default WorkoutScreen;
