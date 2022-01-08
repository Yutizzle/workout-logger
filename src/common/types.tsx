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
    workout_name: string,
    exercise: string,
    set: number,
    reps: number,
    weight: number,
    set_duration: number
}