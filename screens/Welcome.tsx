import React from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LoginStyles from '../styles/LoginStyles';
import { StatusBar } from 'expo-status-bar';
import {supabase} from '../config/supabase'

const WelcomeScreen = () => {
    const signout = async () => {
        supabase.auth.signOut();
    }

    return (
        <View style={LoginStyles.viewContainer}>
            <StatusBar style="dark"/>
            <Text>Welcome Screen</Text>
            {/* Login Button */}
            <TouchableOpacity style={LoginStyles.buttons}
                        onPress={signout}
                    >
                <Text style={LoginStyles.buttonText}>Logout</Text>
            </TouchableOpacity>
        </View>

    );
}

export default WelcomeScreen;