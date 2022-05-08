import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackNavigationProp } from '@react-navigation/stack';

export type ProgramList = {
  id: number;
  program_name: string;
};

export interface IncrFrequency {
  id: number;
  frequency: string;
}

export interface NewProgram {
  program_name: string;
  workouts: ListItem[];
  exercises: NewProgramExercises[];
  sets: NewProgramSets[];
}

export type WorkoutExecutionData = {
  program_id: number;
  program_run: number;
  current_program_cycle: number;
  workout_history_id: number;
  workout_id: number;
  workout_name: string;
  exercise: string;
  set: number;
  reps: number | null;
  weight: number | null;
  set_duration: number | null;
  completed: boolean;
  set_completed: number | null;
  reps_completed: number | null;
  weight_completed: number | null;
  set_duration_completed: number | null;
  next_program_cycle: number;
  next_workout_id: number;
};

export type ListItem = {
  key: string;
  index: number;
  label: string;
};

export type RenderItem = ListItem | NewProgramSets;

export type SetConfig = {
  weight: string;
  reps: string;
  setDuration: string;
  restDuration: string;
  repsIncrFreq: number;
  repsIncrAmount: string;
  maxReps: string;
  weightIncrFreq: number;
  weightIncrAmount: string;
  maxWeight: string;
  setDurationIncrFreq: number;
  setDurationIncrAmount: string;
  maxSetDuration: string;
};

export type NewProgramSets = ListItem &
  Partial<SetConfig> & {
    workoutId?: string;
    exerciseId?: string;
  };

export type NewProgramExercises = ListItem & {
  workoutId?: string;
  sets?: NewProgramSets[];
};

export type NewProgramWorkouts = ListItem & {
  exercises?: NewProgramExercises[];
};

export interface NewWorkout {
  workoutIndex: number;
}

export interface WorkoutName {
  workoutIndex: number;
  workoutName: string;
}

export interface NewExercise {
  workoutId: string;
  exerciseIndex: number;
}

export interface RemoveExercise {
  workoutId: string;
  exerciseId: string;
}

export interface UpdateExercise {
  workoutId: string;
  exercises: NewProgramExercises[];
}

export interface ExerciseName {
  workoutId: string;
  exerciseId: string;
  exerciseName: string;
}

export interface NewSet {
  workoutId: string;
  exerciseId: string;
}

export interface RemoveSet {
  workoutId: string;
  exerciseId: string;
  setIndex: number;
}

export interface UpdateSets {
  workoutId: string;
  exerciseId: string;
  sets: NewProgramSets[];
}

export interface UpdateSingleSet {
  workoutId: string;
  exerciseId: string;
  setId: string;
  prop: Partial<SetConfig>;
}

export type AppStackParamList = {
  WelcomeScreen: undefined;
  MenuScreen: undefined;
  ProgramsScreen: undefined;
  WorkoutScreen: {
    workout_data: WorkoutExecutionData[];
    workout_name: string;
    workout_history_id: number;
    program_id: number;
    next_program_cycle: number;
    next_workout_id: number;
  };
  NewProgramScreen: undefined;
  EditWorkoutScreen: {
    workoutIndex: number;
  };
  EditExerciseScreen: {
    workoutIndex: number;
    exerciseIndex: number;
  };
  EditSetScreen: {
    workoutIndex: number;
    exerciseIndex: number;
    setIndex: number;
  };
};

export type AuthStackParamList = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
};

export type LoginScreenNavigationProp = NativeStackScreenProps<AuthStackParamList, 'LoginScreen'>;
export type RegisterScreenNavigationProp = NativeStackScreenProps<
  AuthStackParamList,
  'RegisterScreen'
>;
export type WelcomeScreenNavigationProp = NativeStackScreenProps<
  AppStackParamList,
  'WelcomeScreen'
>;
export type WelcomeScreenUseNavigationProp = StackNavigationProp<
  AppStackParamList,
  'WelcomeScreen'
>;
export type MenuScreenUseNavigationProp = StackNavigationProp<AppStackParamList, 'WelcomeScreen'>;
export type ProgramsScreenNavigationProp = NativeStackScreenProps<
  AppStackParamList,
  'ProgramsScreen'
>;
export type NewProgramScreenNavigationProp = NativeStackScreenProps<
  AppStackParamList,
  'NewProgramScreen'
>;
export type EditWorkoutScreenNavigationProp = NativeStackScreenProps<
  AppStackParamList,
  'EditWorkoutScreen'
>;
export type EditExerciseScreenNavigationProp = NativeStackScreenProps<
  AppStackParamList,
  'EditExerciseScreen'
>;
export type EditSetScreenNavigationProp = NativeStackScreenProps<
  AppStackParamList,
  'EditSetScreen'
>;
export type WorkoutScreenNavigationProp = NativeStackScreenProps<
  AppStackParamList,
  'WorkoutScreen'
>;

export type RegisterData = {
  firstName: string;
  lastName: string;
  month: string;
  day: string;
  year: string;
  dateOfBirth: string;
  email: string;
  password: string;
  confirmPassword: string;
  yearValid: boolean;
  monthValid: boolean;
  dayValid: boolean;
  emailValid: boolean;
  passwordMatch: boolean;
};

export type NewUserData = {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  password: string;
};

export type Workouts = {
  program_id: number;
  program_run: number;
  program_cycle: number;
  workout_id: number;
  workout_name: string;
  workout_history_id: number | null;
  next_program_cycle: number;
  next_workout_id: number;
};

export type CompletedSets = {
  workout_id: number;
  exercise: string;
  set_completed: number;
  reps_completed: number;
  set_duration_completed: number;
  weight: number;
  user_workout_history_id: number;
};
