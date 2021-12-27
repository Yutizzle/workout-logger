import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CommonStyles from '../styles/Common';
import { StatusBar } from 'expo-status-bar';
import {supabase} from '../config/supabase';
import { AuthContext } from "../components/AuthProvider";

const WelcomeScreen = () => {
    const signout = async () => {
        supabase.auth.signOut();
    }
    //get AuthContext
    const auth = useContext(AuthContext);
    const userSession = auth.userSession;
    const userFirstName = userSession?.user?.user_metadata?.first_name;
    
    return (
        <View style={CommonStyles.viewContainer}>
            <StatusBar style="dark"/>
            <Text>Welcome {userFirstName}!</Text>
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