import { supabase } from './supabase'

export const helper = () => {
    const getTodaysWorkout = async (userId: string) => {
        const { data: workout_detail, error} = await supabase
            .from('workout_detail')
            .select(`
                exercise,
                sets,
                reps,
                set_duration,
                weight,
                
            `);
        return workout_detail;
    }
}