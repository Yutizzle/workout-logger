import React, { useState } from 'react';
import CommonStyles from '../styles/Common'
import { KeyboardAvoidingView, Text, Platform, TouchableOpacity, Alert } from 'react-native';
import { CompletedSets, WorkoutExecutionData, WorkoutScreenNavigationProp } from '../common/types';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '../hooks/useAuth';
import { useSelect, useFilter, useUpdate } from 'react-supabase';
import { ScrollView } from 'react-native-gesture-handler';
import { WorkoutTodo } from '../components/WorkoutTodo';
import { WorkoutHeader } from '../components/Header';

const WorkoutScreen = ({ navigation, route }: WorkoutScreenNavigationProp) => {
    //get AuthContext
    const { session, user } = useAuth();
    const [ workoutData, setWorkoutData ] = useState<WorkoutExecutionData[]>(route.params.workout_data);

    //hook for updating user_workout_history
    const [ updateWorkout, executeUpdateWorkout ] = useUpdate('user_workout_history', {
        filter: (query) => query.eq('id', route.params.workout_history_id)
    });

    //hook for updating user_program
    const [ updateProgram, executeUpdateProgram ] = useUpdate('user_program', {
        filter: (query) => query.eq('program_id', route.params.program_id)
    });

    //hook for selecting from user_exercise_history
    const filter = useFilter(
        (query) => query.eq('user_workout_history_id', route.params.workout_history_id),
        [route.params.workout_history_id],
    );
    const [ completedSets, getCompletedSets ] = useSelect<CompletedSets>('user_exercise_history', {
        columns: `
            workout_id,
            exercise,
            set_completed,
            reps_completed,
            set_duration_completed,
            weight,
            user_workout_history_id
        `,
        filter
    });

    const updateCompletedExercises = (completedSets: CompletedSets[]) => {
        //apply completed sets to workout_data
        const executionData = workoutData.map((set) => {
            let completed = completedSets.find((completed) => {
                return completed.exercise == set.exercise && completed.set_completed == set.set;
            });
            
            if(completed) {
                return ({
                    ...set, 
                    completed: true, 
                    reps_completed: completed.reps_completed, 
                    weight_completed: completed.weight,
                    set_duration_completed: completed.set_duration_completed
                });
            } else {
                return set;
            }
        });

        setWorkoutData(executionData);

        return executionData;
    }

    const completeWorkout = async () => {
        //validate completed sets with database
        const completedSets = await getCompletedSets();
        let workoutData:WorkoutExecutionData[] = [];

        if(completedSets?.data) {
            workoutData = updateCompletedExercises(completedSets?.data);
        } else if (completedSets?.error) {
            console.log('error:', completedSets.error)
        }

        //get exercise set not completed yet
        let allSetsCompleted = true;
        let exerciseNotCompleted = {exercise: '', set: 0};
        workoutData.forEach((set) => {
            if(!set.completed && exerciseNotCompleted.exercise == '') {
                allSetsCompleted = false;
                exerciseNotCompleted.exercise = set.exercise,
                exerciseNotCompleted.set = set.set
            }
        });

        //update database tables if all sets are completed
        if(allSetsCompleted) {
            const now = new Date();
            const update = await executeUpdateWorkout({
                end_time: now,
                updated_at: now,
                updated_by: user?.id
            });

            if(update.error) {
                console.log('error: ', update.error);
            } else {
                const update = await executeUpdateProgram({
                    current_workout_id: route.params.next_workout_id,
                    current_program_cycle: route.params.next_program_cycle,
                    updated_at: new Date(),
                    updated_by: user?.id
                });

                if(update.error) {
                    console.log('error: ', update.error);
                } else {
                    navigation.goBack();
                }
            }
        } else {
            Alert.alert('All Exercises Not Completed', 
                `You have not completed exercise: ${exerciseNotCompleted.exercise}, set: ${exerciseNotCompleted.set}!`,
                [{
                    text: 'OK'
                }]);
        }
    }

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={CommonStyles.viewContainer}>
            <StatusBar style="dark"/>
            <WorkoutHeader workoutName={route.params.workout_name} />
                <ScrollView contentContainerStyle={[CommonStyles.flexGrow, CommonStyles.todoContainer]}>
                    <WorkoutTodo data={workoutData} setWorkoutDataHandler={setWorkoutData}></WorkoutTodo>
                    {/* Complete Workout Button */}
                    <TouchableOpacity style={[CommonStyles.buttons, CommonStyles.buttonsPrimary]} onPress={async () => {await completeWorkout();}}>
                        <Text style={[CommonStyles.buttonText, CommonStyles.textLight]}>Complete Workout</Text>
                    </TouchableOpacity>
                </ScrollView>
        </KeyboardAvoidingView>
    );
}

export default WorkoutScreen;