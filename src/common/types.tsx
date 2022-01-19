import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackNavigationProp } from '@react-navigation/stack';

export type LoginScreenNavigationProp = NativeStackScreenProps<AuthStackParamList, 'LoginScreen'>;
export type RegisterScreenNavigationProp = NativeStackScreenProps<AuthStackParamList, 'RegisterScreen'>;
export type WelcomeScreenNavigationProp = NativeStackScreenProps<AppStackParamList, 'WelcomeScreen'>;
export type WelcomeScreenUseNavigationProp = StackNavigationProp<AppStackParamList, 'WelcomeScreen'>;
export type WorkoutScreenNavigationProp = NativeStackScreenProps<AppStackParamList, 'WorkoutScreen'>;

export type AuthStackParamList = {
    LoginScreen: undefined,
    RegisterScreen: undefined
}

export type AppStackParamList = {
    WelcomeScreen: undefined,
    WorkoutScreen: { 
        workout_data: WorkoutExecutionData[],
        workout_name: string,
        workout_history_id: number,
        program_id: number,
        next_program_cycle: number,
        next_workout_id: number
    }
}

export interface RegisterData {
    firstName: string,
    lastName: string,
    month: string,
    day: string,
    year: string,
    dateOfBirth: string,
    email: string,
    password: string,
    confirmPassword: string,
    yearValid: boolean,
    monthValid: boolean,
    dayValid: boolean,
    emailValid: boolean,
    passwordMatch: boolean
}

export interface WorkoutExecutionData {
    program_id: number,
    program_run: number,
    current_program_cycle: number,
    workout_history_id: number,
    workout_id: number,
    workout_name: string,
    exercise: string,
    set: number,
    reps: number | null,
    weight: number | null,
    set_duration: number | null,
    completed: boolean,
    set_completed: number | null,
    reps_completed: number | null,
    weight_completed: number | null,
    set_duration_completed: number | null,
    next_program_cycle: number,
    next_workout_id: number
}

export interface Workouts {
    program_id: number,
    program_run: number,
    program_cycle: number,
    workout_id: number,
    workout_name: string,
    workout_history_id: number | null,
    next_program_cycle: number,
    next_workout_id: number
}

export interface CompletedSets {
    workout_id: number,
    exercise: string,
    set_completed: number,
    reps_completed: number,
    set_duration_completed: number,
    weight: number,
    user_workout_history_id: number
}