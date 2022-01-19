import React, { useEffect, useState } from 'react';
import CommonStyles from '../styles/Common'
import { KeyboardAvoidingView, Text, Platform, TouchableOpacity, Alert } from 'react-native';
import { WorkoutExecutionData, WorkoutScreenNavigationProp } from '../common/types';
import { Header } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '../hooks/useAuth';
import { useSignOut, useSelect, useFilter, useUpdate } from 'react-supabase';
import { ScrollView } from 'react-native-gesture-handler';
import { WorkoutTodo } from '../components/WorkoutTodo';

const WorkoutScreen = ({ navigation, route }: WorkoutScreenNavigationProp) => {
    //get AuthContext
    const { session, user } = useAuth();
    const [ signOutState, signOut ] = useSignOut();
    const [ workoutData, setWorkoutData ] = useState<WorkoutExecutionData[]>([]);
    const [ updateWorkout, executeUpdateWorkout ] = useUpdate('user_workout_history', {
        filter: (query) => query.eq('id', route.params.workout_history_id)
    });
    const [ updateProgram, executeUpdateProgram ] = useUpdate('user_program', {
        filter: (query) => query.eq('program_id', route.params.program_id)
    });
    const filter = useFilter(
        (query) => query.eq('user_workout_history_id', route.params.workout_history_id),
        [route.params.workout_history_id],
    );
    const [ completedSets, getCompletedSets ] = useSelect('user_exercise_history', {
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

    useEffect(() => {
        //apply completed sets to workout_data
        const executionData = route.params.workout_data.map((set) => {
            let completed = completedSets.data?.find((completed) => {
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
                return ({
                    ...set, 
                    completed: false, 
                    reps_completed: null, 
                    weight_completed: null,
                    set_duration_completed: null
                });
            }
        });

        setWorkoutData(executionData);

    }, [completedSets]);

    const completeWorkout = async () => {
        await getCompletedSets();
        let allSetsCompleted = true;
        let exerciseNotCompleted = {exercise: '', set: 0};
        workoutData.forEach((set) => {
            if(!set.completed && exerciseNotCompleted.exercise == '') {
                allSetsCompleted = false;
                exerciseNotCompleted.exercise = set.exercise,
                exerciseNotCompleted.set = set.set
            }
        });

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

    const signout = async () => {
        await signOut();
        if(signOutState.error) {
            console.log('error:', signOutState.error);
        }
    }
    
    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={CommonStyles.viewContainer}>
            <StatusBar style="dark"/>
            <Header
                backgroundColor=""
                backgroundImageStyle={{}}
                barStyle="default"
                centerComponent={
                    <Text style={CommonStyles.headerTitle}>
                        {route.params.workout_name}
                    </Text>}
                centerContainerStyle={CommonStyles.justifyCenter}
                containerStyle={CommonStyles.headerContainer}
                leftComponent={
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialIcons name="arrow-back" style={CommonStyles.headerIcons} />
                    </TouchableOpacity>
                }
                leftContainerStyle={CommonStyles.justifyCenter}
                placement="center"
                rightComponent={
                    <TouchableOpacity onPress={signout}>
                        <MaterialIcons name="logout" style={CommonStyles.headerIcons} />
                    </TouchableOpacity>
                }
                rightContainerStyle={CommonStyles.justifyCenter}
                statusBarProps={{}}
                />
                <ScrollView contentContainerStyle={[CommonStyles.flexGrow, CommonStyles.todoContainer]}>
                    <WorkoutTodo data={workoutData}></WorkoutTodo>
                    {/* Complete Workout Button */}
                    <TouchableOpacity style={CommonStyles.buttons} onPress={async () => await completeWorkout()}>
                        <Text style={CommonStyles.buttonText}>Complete Workout</Text>
                    </TouchableOpacity>
                </ScrollView>
        </KeyboardAvoidingView>
    );
}

export default WorkoutScreen;