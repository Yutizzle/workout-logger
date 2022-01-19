import React, { useEffect } from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CommonStyles from '../styles/Common';
import { StatusBar } from 'expo-status-bar';
import { useSelect, useFilter, useSignOut, useRealtime, useClient } from 'react-supabase';
import { Header } from "react-native-elements";
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '../hooks/useAuth';
import { WorkoutCard } from '../components/WorkoutCard';
import { WorkoutData } from '../common/types';
import { WelcomeScreenNavigationProp } from '../common/types';

const WelcomeScreen = ({ navigation }: WelcomeScreenNavigationProp) => {
    //get AuthContext
    const { session, user } = useAuth();
    const [ signOutState, signOut ] = useSignOut();
    
    const filter = useFilter(
        (query) => query.eq('user_id', user?.id),
        [user?.id],
      );
    
    const [ result, getUserData ] = useSelect<WorkoutData>('user_workout_exercise', {
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
            next_workout_id
        `,
        filter
    });

    const data: WorkoutData[] = result.data ?? [];
    
    const signout = async () => {
        await signOut();
        if(signOutState.error) {
            console.log('error:', signOutState.error);
        }
    }
    useEffect(() => {
        navigation.addListener('focus', () => getUserData());
    }, [navigation]);

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
                        Today's Workout
                    </Text>}
                centerContainerStyle={CommonStyles.justifyCenter}
                containerStyle={CommonStyles.headerContainer}
                leftComponent={
                    <TouchableOpacity>
                        <View style={CommonStyles.rotate90}>
                            <MaterialIcons name="bar-chart" style={CommonStyles.headerIcons} />
                        </View>
                    </TouchableOpacity>
                }
                leftContainerStyle={CommonStyles.justifyCenter}
                placement="center"
                rightComponent={
                    <TouchableOpacity onPress={async () => {await signout()}}>
                        <MaterialIcons name="logout" style={CommonStyles.headerIcons} />
                    </TouchableOpacity>
                }
                rightContainerStyle={CommonStyles.justifyCenter}
                statusBarProps={{}}
                />
            {/* Workout */}
            <ScrollView contentContainerStyle={CommonStyles.flexGrow}>
                <WorkoutCard workouts={data} />
            </ScrollView>
        </KeyboardAvoidingView>

    );
}

export default WelcomeScreen;