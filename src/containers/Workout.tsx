import React from 'react';
import CommonStyles from '../styles/Common'
import { KeyboardAvoidingView, View, Text, Platform, TouchableOpacity } from 'react-native';
import { WorkoutScreenNavigationProp } from '../common/types';
import { Header } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '../hooks/useAuth';
import { useSignOut } from 'react-supabase';

const WorkoutScreen = ({ navigation }: WorkoutScreenNavigationProp) => {
    //get AuthContext
    const { session, user } = useAuth();
    const [ signOutState, signOut ] = useSignOut();

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
                        Today's Workout
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
        </KeyboardAvoidingView>
    );
}

export default WorkoutScreen;