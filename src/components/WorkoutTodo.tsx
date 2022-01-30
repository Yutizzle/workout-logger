import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TextInput } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import { useInsert } from 'react-supabase';
import CommonStyles from '../styles/Common';
import { WorkoutExecutionData } from '../types';
import useAuth from '../hooks/useAuth';

function SetTodo(props: {
  data: WorkoutExecutionData;
  setWorkoutDataHandler: React.Dispatch<React.SetStateAction<WorkoutExecutionData[]>>;
}) {
  const { data, setWorkoutDataHandler } = props;
  const session = useAuth();
  const [, insertSet] = useInsert('user_exercise_history');
  const [exerciseData, setExerciseData] = useState<WorkoutExecutionData>(data);
  const [userInputData, setUserInputData] = useState({ reps: '', weight: '', set_duration: '' });
  const [buttonState, setButtonState] = useState({ disabled: false });

  useEffect(() => {
    const reps = data.reps_completed ?? data.reps;
    const weight = data.weight_completed ?? data.weight;
    const setDuration = data.set_duration_completed ?? data.set_duration;
    setUserInputData({
      reps: reps ? reps.toString() : '',
      weight: weight ? weight.toString() : '',
      set_duration: setDuration ? setDuration.toString() : '',
    });
    setExerciseData(data);
  }, [data]);

  const completeSet = async () => {
    setButtonState({ disabled: true });
    const repsCompleted = parseInt(userInputData.reps, 10);
    const weightCompleted = parseInt(userInputData.weight, 10);
    const setDurationCompleted = parseInt(userInputData.set_duration, 10);
    if (
      (exerciseData.reps && Number.isNaN(repsCompleted)) ||
      (exerciseData.weight && Number.isNaN(weightCompleted)) ||
      (exerciseData.set_duration && Number.isNaN(setDurationCompleted))
    ) {
      console.log('Error: Input is not a valid number!');
      console.log('User Input: ', userInputData);
    } else {
      const setData = {
        user_id: session.user?.id,
        workout_id: exerciseData.workout_id,
        exercise: exerciseData.exercise,
        set_completed: exerciseData.set,
        reps_completed: repsCompleted,
        weight: weightCompleted,
        set_duration_completed: setDurationCompleted,
        set_failed:
          ((exerciseData.reps && repsCompleted < exerciseData.reps) ?? false) ||
          ((exerciseData.weight && weightCompleted < exerciseData.weight) ?? false) ||
          ((exerciseData.set_duration && setDurationCompleted < exerciseData.set_duration) ??
            false),
        user_workout_history_id: exerciseData.workout_history_id,
        created_by: session.user?.id,
      };
      const insertState = await insertSet(setData);

      if (insertState.error) {
        console.log('error: ', insertState.error);
        console.log('Insert Data: ', setData);
      } else {
        // update child component SetTodo data
        setExerciseData((prev) => ({
          ...prev,
          completed: true,
          reps_completed: repsCompleted,
          weight_completed: weightCompleted,
          set_duration_completed: setDurationCompleted,
        }));

        // update parent component WorkoutScreen data
        setWorkoutDataHandler((prev) =>
          prev.map((set) => {
            if (set.exercise === exerciseData.exercise && set.set === exerciseData.set) {
              return {
                ...exerciseData,
                completed: true,
                reps_completed: repsCompleted,
                weight_completed: weightCompleted,
                set_duration_completed: setDurationCompleted,
              };
            }
            return set;
          })
        );
      }
    }
    setButtonState({ disabled: false });
  };

  return (
    <View style={CommonStyles.setTodoContainer}>
      <TouchableOpacity
        style={CommonStyles.setTodoGradientContainer}
        disabled={exerciseData.completed || buttonState.disabled}
        onPress={async () => completeSet()}
      >
        <LinearGradient
          colors={['#284b63', '#f9f9f9', '#fff']}
          start={{ x: 0, y: 1 }}
          end={{ x: 3, y: 1 }}
          style={
            !exerciseData.completed
              ? CommonStyles.setTodoGradient
              : CommonStyles.setTodoGradientCompleted
          }
        >
          <View
            style={
              !exerciseData.completed
                ? CommonStyles.setTodoGradientContent
                : CommonStyles.setTodoCompleted
            }
          >
            <MaterialIcons
              name="check"
              style={exerciseData.completed ? CommonStyles.textLight : {}}
            />
          </View>
        </LinearGradient>
      </TouchableOpacity>
      {exerciseData.reps && (
        <>
          <Text style={CommonStyles.setTodoText}>Reps:</Text>
          <View style={CommonStyles.inputContainer}>
            <TextInput
              style={
                !exerciseData.completed
                  ? CommonStyles.inlineInput
                  : [CommonStyles.inlineInput, CommonStyles.disabled]
              }
              editable={!exerciseData.completed}
              maxLength={2}
              onChangeText={(reps) => {
                setUserInputData({ ...userInputData, reps: reps.replace(/[^0-9]/g, '') });
              }}
              value={userInputData.reps}
              keyboardType="numeric"
            />
          </View>
        </>
      )}
      {exerciseData.weight && (
        <>
          <Text style={CommonStyles.setTodoText}>Weight:</Text>
          <View style={CommonStyles.inputContainer}>
            <TextInput
              style={
                !exerciseData.completed
                  ? CommonStyles.inlineInput
                  : [CommonStyles.inlineInput, CommonStyles.disabled]
              }
              editable={!exerciseData.completed}
              onChangeText={(weight) => {
                setUserInputData({ ...userInputData, weight: weight.replace(/[^0-9]/g, '') });
              }}
              value={userInputData.weight}
              keyboardType="numeric"
            />
          </View>
          <Text style={CommonStyles.setTodoText}>lbs</Text>
        </>
      )}
      {exerciseData.set_duration && (
        <>
          <Text style={CommonStyles.setTodoText}>Set Duration:</Text>
          <View style={CommonStyles.inputContainer}>
            <TextInput
              style={
                !exerciseData.completed
                  ? CommonStyles.inlineInput
                  : [CommonStyles.inlineInput, CommonStyles.disabled]
              }
              editable={!exerciseData.completed}
              onChangeText={(duration) => {
                setUserInputData({
                  ...userInputData,
                  set_duration: duration.replace(/[^0-9]/g, ''),
                });
              }}
              value={userInputData.set_duration}
              keyboardType="numeric"
            />
          </View>
          <Text style={CommonStyles.setTodoText}>secs</Text>
        </>
      )}
    </View>
  );
}

export default function WorkoutTodo(props: {
  data: WorkoutExecutionData[];
  setWorkoutDataHandler: React.Dispatch<React.SetStateAction<WorkoutExecutionData[]>>;
}) {
  const { data, setWorkoutDataHandler } = props;
  let prevExercise = '';
  const todo = data.map((set) => {
    const prev = prevExercise;
    if (set.exercise !== prevExercise) {
      prevExercise = set.exercise;
    }

    return (
      <React.Fragment key={`${set.workout_id}-${set.exercise}-${set.set}`}>
        {set.exercise !== prev && (
          <>
            <Text key={`${set.exercise}`} style={CommonStyles.todoTextHead}>
              {set.exercise}
            </Text>
            <LinearGradient
              colors={['#284b63', '#fff']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={CommonStyles.dividerGradient}
            />
          </>
        )}
        <SetTodo
          key={`${set.exercise}-${set.set}`}
          data={set}
          setWorkoutDataHandler={setWorkoutDataHandler}
        />
      </React.Fragment>
    );
  });

  return <View>{todo}</View>;
}
