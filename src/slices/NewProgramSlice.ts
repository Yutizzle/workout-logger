import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { 
  NewProgramWorkouts, 
  NewWorkout,
  WorkoutName,
  NewExercise,
  RemoveExercise,
  UpdateExercise,
  ExerciseName,
  NewSet,
  RemoveSet,
  UpdateSets,
  UpdateSingleSet
} from '../types';

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
              label: `Set #${index + 1}`,
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
          const workout = workouts[workoutIndex];
          const originalExercises = workout.exercises ?? [];
          originalExercises.splice(0, originalExercises.length, ...exercises);
        },
        updateExerciseName: ({workouts}, action: PayloadAction<ExerciseName>) => {
          const {workoutIndex, exerciseIndex, exerciseName} = action.payload;
          const workout = workouts[workoutIndex];
          const exercises = workout.exercises ?? [];
          exercises[exerciseIndex].label = exerciseName;
        },
        addSet: ({workouts}, action: PayloadAction<NewSet>) => {
          const {workoutIndex, exerciseIndex, setIndex, set} = action.payload;
          const workout = workouts[workoutIndex];
          const exercises = workout.exercises ?? [];
          const sets = exercises[exerciseIndex].sets ?? [];
          sets.splice(setIndex + 1, 0, set);
          sets.forEach((data, i) => {data.index = i;});
        },
        removeSet: ({workouts}, action: PayloadAction<RemoveSet>) => {
          const {workoutIndex, exerciseIndex, setIndex} = action.payload;
          const workout = workouts[workoutIndex];
          const exercises = workout.exercises ?? [];
          const sets = exercises[exerciseIndex].sets ?? [];
          sets.splice(setIndex, 1);
          sets.forEach((data, i) => {data.index = i;});
        }, 
        updateSets: ({workouts}, action: PayloadAction<UpdateSets>) => {
          const {workoutIndex, exerciseIndex, sets} = action.payload;
          const workout = workouts[workoutIndex];
          const exercises = workout.exercises ?? [];
          const originalSets = exercises[exerciseIndex].sets ?? [];
          originalSets.splice(0, originalSets.length, ...sets);
        },
        updateSelectedSet: ({workouts}, action: PayloadAction<UpdateSingleSet>) => {
          const {workoutIndex, exerciseIndex, setIndex, prop} = action.payload;
          const workout = workouts[workoutIndex];
          const exercises = workout.exercises ?? [];
          const originalSets = exercises[exerciseIndex].sets ?? [];
          originalSets[setIndex] = {...originalSets[setIndex], ...prop};
        }
    }
});
export const { addWorkout, removeWorkout, updateWorkouts, resetWorkouts, addExercise, removeExercise, updateExercises, updateWorkoutName, addSet, removeSet, updateSets, updateExerciseName, updateSelectedSet } = NewProgramSlice.actions;
export default NewProgramSlice.reducer;