import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import {
  ExerciseName,
  ListItem,
  NewExercise,
  NewProgramExercises,
  NewProgramSets,
  NewProgramWorkouts,
  NewSet,
  NewWorkout,
  RemoveExercise,
  RemoveSet,
  UpdateExercise,
  UpdateSets,
  UpdateSingleSet,
  WorkoutName,
} from '../types';

interface NewProgram {
  workouts: ListItem[];
  exercises: NewProgramExercises[];
  sets: NewProgramSets[];
}
const program: NewProgram = {
  workouts: [],
  exercises: [],
  sets: [],
};

const newWorkout = { key: `workout-0`, index: 0, label: `New Workout` };

const newExercise = {
  key: `exercise-0`,
  index: 0,
  label: `New Exercise`,
  workoutId: `workout-0`,
};

const newSet = {
  key: `set-0`,
  index: 0,
  label: `Set #1`,
  weight: '',
  reps: '',
  setDuration: '',
  restDuration: '',
  repsIncrFreq: 0,
  repsIncrAmount: '',
  maxReps: '',
  weightIncrFreq: 0,
  weightIncrAmount: '',
  maxWeight: '',
  setDurationIncrFreq: 0,
  setDurationIncrAmount: '',
  maxSetDuration: '',
  workoutId: `workout-0`,
  exerciseId: `exercise-0`,
};

// init new program data
program.workouts.push(newWorkout);
program.exercises.push(newExercise);
program.sets.push(newSet);

export const NewProgramSlice = createSlice({
  name: 'newProgramWorkouts',
  initialState: { ...program, uniqueId: 1 },
  reducers: {
    addWorkout: (state, action: PayloadAction<NewWorkout>) => {
      const { workoutIndex } = action.payload;
      const { workouts, exercises, sets, uniqueId } = state;

      // generate unique Ids
      const uid = uniqueId + 1;
      state.uniqueId = uid;
      const workoutId = `workout-${uid}`;
      const exerciseId = `exercise-${uid}`;
      const setId = `set-${uid}`;

      // generate new workout, exercise, and set
      const newWorkoutItem = {
        key: workoutId,
        index: workoutIndex,
        label: `New Workout`,
      };
      const newExerciseItem = { ...newExercise, key: exerciseId, workoutId };
      const newSetItem = { ...newSet, key: setId, workoutId, exerciseId };

      // add workout after selected index
      workouts.splice(workoutIndex + 1, 0, newWorkoutItem);

      // update workout indices
      workouts.forEach((data, i) => {
        data.index = i;
      });

      // add new exercise
      exercises.push(newExerciseItem);

      // add new set
      sets.push(newSetItem);
    },
    removeWorkout: (state, action: PayloadAction<number>) => {
      const workoutIndex = action.payload;
      const { workouts, sets, exercises } = state;

      const workoutId = workouts[workoutIndex].key;
      // remove workout at selected index
      workouts.splice(workoutIndex, 1);

      // update workout indices
      workouts.forEach((data, i) => {
        data.index = i;
      });

      // remove all exercises in workout
      state.exercises = exercises.filter((item) => item.workoutId !== workoutId);

      // remove all sets in workout
      state.sets = sets.filter((item) => item.workoutId !== workoutId);
    },
    updateWorkouts: ({ workouts }, action: PayloadAction<NewProgramWorkouts[]>) => {
      workouts.splice(0, workouts.length, ...action.payload);
    },
    updateWorkoutName: ({ workouts }, action: PayloadAction<WorkoutName>) => {
      const { workoutIndex, workoutName } = action.payload;
      workouts[workoutIndex].label = workoutName;
    },
    resetWorkouts: (state) => {
      const { workouts, exercises, sets } = state;

      // reset unique id
      state.uniqueId = 1;

      // remove all workouts, exercises, sets
      workouts.splice(0, workouts.length, newWorkout);
      exercises.splice(0, exercises.length, newExercise);
      sets.splice(0, sets.length, newSet);
    },
    addExercise: (state, action: PayloadAction<NewExercise>) => {
      const { workoutId, exerciseIndex } = action.payload;
      const { exercises, sets, uniqueId } = state;

      // generate unique Ids
      const uid = uniqueId + 1;
      state.uniqueId = uid;
      const exerciseId = `exercise-${uid}`;
      const setId = `set-${uid}`;

      // generate new exercise, and set
      const newExerciseItem = {
        ...newExercise,
        key: exerciseId,
        index: exerciseIndex + 1,
        label: `New Exercise`,
        workoutId,
      };
      const newSetItem = { ...newSet, key: setId, workoutId, exerciseId };

      // add exercise after selected index
      const tmpExercises = exercises.filter((item) => item.workoutId === workoutId);
      tmpExercises.splice(exerciseIndex + 1, 0, newExerciseItem);

      // update exercise indices
      tmpExercises.forEach((data, i) => {
        data.index = i;
      });

      // update state
      state.exercises = [
        ...exercises.filter((item) => item.workoutId !== workoutId),
        ...tmpExercises,
      ];

      // add new set
      sets.push(newSetItem);
    },
    removeExercise: (state, action: PayloadAction<RemoveExercise>) => {
      const { workoutId, exerciseId } = action.payload;
      const { exercises, sets } = state;

      // remove exercise
      let tmpExercises = exercises.filter((item) => item.workoutId === workoutId);
      tmpExercises = tmpExercises.filter((item) => item.key !== exerciseId);

      // update exercise indices
      tmpExercises.forEach((data, i) => {
        data.index = i;
      });

      // update state
      state.exercises = [
        ...exercises.filter((item) => item.workoutId !== workoutId),
        ...tmpExercises,
      ];

      // remove sets
      state.sets = sets.filter((item) => item.exerciseId !== exerciseId);
    },
    updateExercises: (state, action: PayloadAction<UpdateExercise>) => {
      const { workoutId, exercises } = action.payload;

      // get exercises in workout
      const tmpExercises = state.exercises.filter((item) => item.workoutId === workoutId);

      // replace exercises with updated data
      tmpExercises.splice(0, tmpExercises.length, ...exercises);

      // update state
      state.exercises = [
        ...state.exercises.filter((item) => item.workoutId !== workoutId),
        ...tmpExercises,
      ];
    },
    updateExerciseName: ({ exercises }, action: PayloadAction<ExerciseName>) => {
      const { workoutId, exerciseId, exerciseName } = action.payload;
      const idx = exercises.findIndex(
        (item) => item.workoutId === workoutId && item.key === exerciseId
      );
      exercises[idx].label = exerciseName;
    },
    addSet: (state, action: PayloadAction<NewSet>) => {
      const { workoutId, exerciseId } = action.payload;
      const { sets, uniqueId } = state;

      const tmpSets = sets.filter(
        (item) => item.workoutId === workoutId && item.exerciseId === exerciseId
      );

      // generate unique Ids
      const uid = uniqueId + 1;
      state.uniqueId = uid;
      const setId = `set-${uid}`;

      // generate new exercise, and set
      const newSetItem = {
        ...newSet,
        key: setId,
        index: tmpSets.length,
        label: `Set #${tmpSets.length + 1}`,
        workoutId,
        exerciseId,
      };

      // add set
      sets.push(newSetItem);
    },
    removeSet: (state, action: PayloadAction<RemoveSet>) => {
      const { workoutId, exerciseId, setIndex } = action.payload;
      const { sets } = state;

      // get sets in selected exercise
      const tmpSets = sets.filter(
        (item) => item.workoutId === workoutId && item.exerciseId === exerciseId
      );

      // remove set
      tmpSets.splice(setIndex, 1);

      // update indices
      tmpSets.forEach((data, i) => {
        data.index = i;
        data.label = `Set #${i + 1}`;
      });

      // update state
      state.sets = [...sets.filter((item) => item.exerciseId !== exerciseId), ...tmpSets];
    },
    updateSets: (state, action: PayloadAction<UpdateSets>) => {
      const { workoutId, exerciseId, sets } = action.payload;

      state.sets = [
        ...state.sets.filter(
          (item) => item.workoutId !== workoutId && item.exerciseId !== exerciseId
        ),
        ...sets,
      ];
    },
    updateSelectedSet: ({ sets }, action: PayloadAction<UpdateSingleSet>) => {
      const { workoutId, exerciseId, setId, prop } = action.payload;
      const idx = sets.findIndex(
        (s) => s.workoutId === workoutId && s.exerciseId === exerciseId && s.key === setId
      );
      sets[idx] = { ...sets[idx], ...prop };
    },
  },
});
export const {
  addWorkout,
  removeWorkout,
  updateWorkouts,
  resetWorkouts,
  addExercise,
  removeExercise,
  updateExercises,
  updateWorkoutName,
  addSet,
  removeSet,
  updateSets,
  updateExerciseName,
  updateSelectedSet,
} = NewProgramSlice.actions;
export default NewProgramSlice.reducer;
