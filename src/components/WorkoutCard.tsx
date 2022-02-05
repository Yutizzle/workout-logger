import React, { ReactElement, useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { Card } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useInsert } from 'react-supabase';
import { useNavigation } from '@react-navigation/native';
import CommonStyles from '../styles/Common';
import { WelcomeScreenUseNavigationProp, WorkoutExecutionData, Workouts } from '../types';
import useAuth from '../hooks/useAuth';

type ExerciseProps = {
  exercise: string;
};

type ExerciseDetailProps = {
  exercise: WorkoutExecutionData;
};

type WorkoutCardProps = {
  workoutSets: WorkoutExecutionData[];
};

function Exercise({ exercise }: ExerciseProps) {
  return <Text style={CommonStyles.cardTextHead}>{exercise}</Text>;
}

function ExerciseDetail({ exercise }: ExerciseDetailProps) {
  return (
    <View style={CommonStyles.cardTextRowContainer}>
      {exercise.set && <Text style={CommonStyles.cardText}>Set: {exercise.set}</Text>}
      {exercise.reps && <Text style={CommonStyles.cardText}>Reps: {exercise.reps}</Text>}
      {exercise.weight && <Text style={CommonStyles.cardText}>Weight: {exercise.weight} lbs</Text>}
      {exercise.set_duration && (
        <Text style={CommonStyles.cardText}>Set Duration: {exercise.set_duration} secs</Text>
      )}
    </View>
  );
}

export default function WorkoutCard({ workoutSets }: WorkoutCardProps) {
  const { session, user } = useAuth();
  const navigation = useNavigation<WelcomeScreenUseNavigationProp>();
  const [insertState, insertHistory] = useInsert('user_workout_history');
  const [workouts, setWorkouts] = useState<Workouts[]>([]);
  const [exerciseData, setExerciseData] = useState<WorkoutExecutionData[]>([]);
  const cards: ReactElement[] = [];
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const startWorkout = async (data: Workouts, idx: number) => {
    setButtonDisabled(true);

    if (session && user?.id) {
      let workoutHistoryId = data.workout_history_id ?? 0;

      // add workout history if not exists
      if (workoutHistoryId === 0) {
        const insert = await insertHistory({
          user_id: user?.id,
          program_id: data.program_id,
          workout_id: data.workout_id,
          program_cycle: data.program_cycle,
          program_run: data.program_run,
          start_time: new Date(),
        });

        workoutHistoryId = insert.data[0].id;

        setWorkouts((prevState) => {
          const allWorkouts = [...prevState];
          allWorkouts[idx] = { ...allWorkouts[idx], workout_history_id: workoutHistoryId };
          return allWorkouts;
        });

        setExerciseData((prev) =>
          prev.map((set) => {
            const tmpSet = set;
            tmpSet.workout_history_id = workoutHistoryId;
            return tmpSet;
          })
        );
      }

      if (insertState.error) {
        // console.log(insertState.error);
      } else {
        navigation.navigate('WorkoutScreen', {
          workout_data: exerciseData,
          workout_name: data.workout_name,
          workout_history_id: workoutHistoryId,
          program_id: data.program_id,
          next_program_cycle: data.next_program_cycle,
          next_workout_id: data.next_workout_id,
        });
      }
    }

    setButtonDisabled(false);
  };

  useEffect(() => {
    if (workoutSets) {
      /* get unique workouts from json data */
      const temp = new Set<string>(
        workoutSets.map((w: WorkoutExecutionData) =>
          JSON.stringify({
            workout_id: w.workout_id,
            workout_history_id: w.workout_history_id,
            workout_name: w.workout_name,
            program_id: w.program_id,
            program_run: w.program_run,
            program_cycle: w.current_program_cycle,
            next_program_cycle: w.next_program_cycle,
            next_workout_id: w.next_workout_id,
          })
        )
      );

      const uniqueWorkouts = Array.from(temp).map((workout) => JSON.parse(workout));
      setWorkouts(uniqueWorkouts);
      setExerciseData(workoutSets);
    }
  }, [workoutSets]);

  if (workouts) {
    /* for each workout, display each exercise and its details */
    workouts.forEach((workout, index) => {
      let prevExercise = '';

      /* get and display exercise data for current workout */
      const exerciseList = workoutSets
        .filter((exercise: WorkoutExecutionData) => exercise.workout_id === workout.workout_id)
        .map((exercise: WorkoutExecutionData) => {
          const prev = prevExercise;
          if (exercise.exercise !== prevExercise) {
            prevExercise = exercise.exercise;
          }
          return (
            <React.Fragment key={`${exercise.exercise}-${workout.workout_id}-${exercise.set}`}>
              {/* Exercise Name */}
              {exercise.exercise !== prev && (
                <Exercise
                  key={`${exercise.exercise}-${workout.workout_id}`}
                  exercise={exercise.exercise}
                />
              )}
              {/* Exercise Set Detail */}
              <ExerciseDetail
                key={`${exercise.exercise}-${exercise.set}-${workout.workout_id}`}
                exercise={exercise}
              />
            </React.Fragment>
          );
        });

      cards.push(
        <Card
          key={workout.workout_id}
          containerStyle={CommonStyles.cardContainer}
          wrapperStyle={{}}
        >
          {/* Workout Title */}
          <Card.Title style={CommonStyles.cardTitle}>{workout.workout_name}</Card.Title>
          <Card.Divider />
          {/* Exercise List */}
          <View style={CommonStyles.cardTextContainer}>{exerciseList}</View>
          {/* Start Workout Button */}
          <TouchableOpacity
            style={[CommonStyles.buttons, CommonStyles.buttonsPrimary]}
            disabled={buttonDisabled}
            onPress={async () => {
              await startWorkout(
                {
                  program_id: workout.program_id,
                  program_run: workout.program_run,
                  program_cycle: workout.program_cycle,
                  workout_id: workout.workout_id,
                  workout_name: workout.workout_name,
                  workout_history_id: workout.workout_history_id,
                  next_program_cycle: workout.next_program_cycle,
                  next_workout_id: workout.next_workout_id,
                },
                index
              );
            }}
          >
            {insertState.fetching ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={[CommonStyles.buttonText, CommonStyles.textLight]}>
                {workouts[index].workout_history_id != null ? 'Resume Workout' : 'Start Workout'}
              </Text>
            )}
          </TouchableOpacity>
        </Card>
      );
    });
  }

  return <View>{cards}</View>;
}
