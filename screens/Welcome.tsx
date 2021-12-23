import React from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CommonStyles from '../styles/Common';
import { StatusBar } from 'expo-status-bar';
import {supabase} from '../config/supabase'

const WelcomeScreen = () => {
    const signout = async () => {
        supabase.auth.signOut();
    }

    return (
        <View style={CommonStyles.viewContainer}>
            <StatusBar style="dark"/>
            <Text>Welcome Screen</Text>
            {/* Login Button */}
            <TouchableOpacity style={CommonStyles.buttons}
                        onPress={signout}
                    >
                <Text style={CommonStyles.buttonText}>Logout</Text>
            </TouchableOpacity>
        </View>

    );
}

export default WelcomeScreen;