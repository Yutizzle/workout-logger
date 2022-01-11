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
        workout_data: WorkoutData[],
        workout_name: string,
        workout_history_id: number
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

export interface WorkoutData {
    program_id: number,
    program_run: number,
    current_program_cycle: number,
    workout_history_id: number | null,
    workout_id: number,
    workout_name: string,
    exercise: string,
    set: number,
    reps: number,
    weight: number,
    set_duration: number
}

export interface WorkoutExecutionData {
    program_id: number,
    program_run: number,
    current_program_cycle: number,
    workout_history_id: number | null,
    workout_id: number,
    workout_name: string,
    exercise: string,
    set: number,
    reps: number,
    weight: number,
    set_duration: number,
    completed: boolean,
    reps_completed: number,
    set_duration_completed: number
}

export interface WorkoutHistory {
    program_id: number,
    program_run: number,
    program_cycle: number,
    workout_id: number,
    workout_name: string,
    workout_history_id: number | null
}