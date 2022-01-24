import React, { useEffect } from 'react';
import { ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import CommonStyles from '../styles/Common';
import { StatusBar } from 'expo-status-bar';
import { useSelect, useFilter, useSignOut } from 'react-supabase';
import { useAuth } from '../hooks/useAuth';
import { WorkoutCard } from '../components/WorkoutCard';
import { WorkoutExecutionData } from '../common/types';
import { WelcomeScreenNavigationProp } from '../common/types';
import { CommonHeader } from '../components/Header';

const WelcomeScreen = ({ navigation }: WelcomeScreenNavigationProp) => {
    //get AuthContext
    const { session, user } = useAuth();
    
    const filter = useFilter(
        (query) => query.eq('user_id', user?.id),
        [user?.id],
      );
    
    const [ result, getUserData ] = useSelect<WorkoutExecutionData>('user_workout_exercise', {
        columns: `
            program_id,
            program_run,
            current_program_cycle,
            workout_history_id,
            workout_id,
            workout_name,
            exercise,
            set,
            reps,
            weight,
            set_duration,
            next_program_cycle,
            next_workout_id,
            completed,
            set_completed,
            reps_completed,
            weight_completed,
            set_duration_completed
        `,
        filter
    });

    const data: WorkoutExecutionData[] = result.data ?? [];
    
    useEffect(() => {
        navigation.addListener('focus', () => getUserData());
    }, [navigation]);

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={CommonStyles.viewContainer}>
            <StatusBar style="dark"/>
            <CommonHeader />
            {/* Workout */}
            <ScrollView contentContainerStyle={CommonStyles.flexGrow}>
                <WorkoutCard workouts={data} />
            </ScrollView>
        </KeyboardAvoidingView>

    );
}

export default WelcomeScreen;