import React, { useEffect, useState } from 'react';
import CommonStyles from '../styles/Common'
import { KeyboardAvoidingView, View, Text, Platform, TouchableOpacity } from 'react-native';
import { WorkoutExecutionData, WorkoutScreenNavigationProp } from '../common/types';
import { Header } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '../hooks/useAuth';
import { useSignOut, useSelect, useFilter } from 'react-supabase';
import { ScrollView } from 'react-native-gesture-handler';
import { WorkoutTodo } from '../components/WorkoutTodo';

type Workout = {
    workout_name: string
}

const WorkoutScreen = ({ navigation, route }: WorkoutScreenNavigationProp) => {
    //get AuthContext
    const { session, user } = useAuth();
    const [ signOutState, signOut ] = useSignOut();
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
    const [ workoutData, setWorkoutData ] = useState<WorkoutExecutionData[]>([]);
    
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
                    set_duration_completed: completed.set_duration_completed
                });
            } else {
                return ({
                    ...set, 
                    completed: false, 
                    reps_completed: 0, 
                    set_duration_completed: 0
                });
            }
        });
        
        setWorkoutData(executionData);

    }, [completedSets]);

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
                </ScrollView>
        </KeyboardAvoidingView>
    );
}

export default WorkoutScreen;