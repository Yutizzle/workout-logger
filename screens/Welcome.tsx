import React, {FC} from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getAuth, signOut } from '@firebase/auth';
import LoginStyles from '../styles/LoginStyles';

const auth = getAuth();

const WelcomeScreen : FC = () => {
    const signout = () => {
        signOut(auth);
    }

    return (
        <View>
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