import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { NewProgramWorkouts, NewProgramExercises } from '../types';

interface NewWorkout {
  workout: NewProgramWorkouts,
  workoutIndex: number
}

interface WorkoutName {
  workoutIndex: number,
  workoutName: string
}

interface NewExercise {
  workoutIndex: number,
  exerciseIndex: number
  exercise: NewProgramExercises
}

interface RemoveExercise {
  workoutIndex: number,
  exerciseIndex: number
}

interface UpdateExercise {
  workoutIndex: number,
  exercises: NewProgramExercises[]
}

const initialWorkouts: NewProgramWorkouts[] = [...Array(1)].map((_, index) => {
    const item = {
      key: `item-${index}`,
      index,
    };

    return {
      ...item,
      label: `New Workout #${index + 1}`,
      exercises: [
        {
          ...item,
          label: `New Exercise #${index + 1}`,
          sets: [
            {
              ...item,
              label: `New Set #${index + 1}`,
            },
          ],
        },
      ],
    };
});

export const NewProgramSlice = createSlice({
    name: "newProgramWorkouts",
    initialState: { workouts: initialWorkouts},
    reducers: {
        addWorkout: ({workouts}, action: PayloadAction<NewWorkout>) => {
          workouts.splice(action.payload.workoutIndex + 1, 0, action.payload.workout);
          workouts.forEach((data, i) => {data.index = i;});
        },
        removeWorkout: ({workouts}, action: PayloadAction<number>) => {
          workouts.splice(action.payload, 1);
          workouts.forEach((data, i) => {data.index = i;});
        },
        updateWorkouts: ({workouts}, action: PayloadAction<NewProgramWorkouts[]>) => {
          workouts.splice(0, workouts.length, ...action.payload);
        },
        updateWorkoutName: ({workouts}, action: PayloadAction<WorkoutName>) => {
          const {workoutIndex, workoutName} = action.payload;
          workouts[workoutIndex].label = workoutName;
        },
        resetWorkouts: ({workouts}) => {
          workouts.splice(0, workouts.length, initialWorkouts[0]);
        },
        addExercise: ({workouts}, action: PayloadAction<NewExercise>) => {
          const {workoutIndex, exerciseIndex, exercise} = action.payload;
          workouts[workoutIndex].exercises?.splice(exerciseIndex + 1, 0, exercise);
          workouts[workoutIndex].exercises?.forEach((data, i) => {data.index = i;});
        },
        removeExercise: ({workouts}, action: PayloadAction<RemoveExercise>) => {
          const {workoutIndex, exerciseIndex} = action.payload;
          workouts[workoutIndex].exercises?.splice(exerciseIndex, 1);
          workouts[workoutIndex].exercises?.forEach((data, i) => {data.index = i;});
        }, 
        updateExercises: ({workouts}, action: PayloadAction<UpdateExercise>) => {
          const {workoutIndex, exercises} = action.payload;
          const numExercises = workouts[workoutIndex].exercises?.length ?? 0;
          workouts[workoutIndex].exercises?.splice(0, numExercises, ...exercises);
        },
    }
});
export const { addWorkout, removeWorkout, updateWorkouts, resetWorkouts, addExercise, removeExercise, updateExercises, updateWorkoutName } = NewProgramSlice.actions;
export default NewProgramSlice.reducer;