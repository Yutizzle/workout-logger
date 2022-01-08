import React from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CommonStyles from '../styles/Common';
import { StatusBar } from 'expo-status-bar';
import { useSelect, useFilter, useSignOut } from 'react-supabase';
import { Header } from "react-native-elements";
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '../hooks/useAuth';
import { WorkoutCard } from '../components/WorkoutCard';
import { WorkoutData } from '../common/types';

const WelcomeScreen = () => {
    //get AuthContext
    const { session, user } = useAuth();
    const [ signOutState, signOut ] = useSignOut();
    const filter = useFilter(
        (query) => query.eq('user_id', user?.id),
        [session],
      );
    
    const [ result, getUserData ] = useSelect<WorkoutData>('user_workout_exercise', {
        columns: `
            workout_name,
            exercise,
            set,
            reps,
            weight,
            set_duration
        `,
        filter
    });

    const signout = async () => {
        await signOut();
        if(signOutState.error) {
            console.log('error:', signOutState.error);
        }
    }

    return (
        <KeyboardAvoidingView style={CommonStyles.viewContainer}>
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
                    <TouchableOpacity onPress={signout}>
                        <MaterialIcons name="logout" style={CommonStyles.headerIcons} />
                    </TouchableOpacity>
                }
                rightContainerStyle={CommonStyles.justifyCenter}
                statusBarProps={{}}
                />
            {/* Workout */}
            <ScrollView>
                <WorkoutCard workouts={result.data} />
            </ScrollView>
        </KeyboardAvoidingView>

    );
}

export default WelcomeScreen;