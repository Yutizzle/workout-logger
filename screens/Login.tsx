import React, { FC, useState } from 'react';
import { View, ImageBackground, StyleSheet, Text, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons'
import { getAuth, signInWithEmailAndPassword } from '@firebase/auth';
import { ErrorMessage } from '../components';
import LoginStyles from '../styles/LoginStyles';

const auth = getAuth();

const LoginScreen : FC = ({ navigation }: any) =>  {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passHide, togglePassHide] = useState(true);
    const [loginError, setLoginError] = useState('');

    const onLogin = async () => {
        try {
            if (email !== '' && password !== '') {
                await signInWithEmailAndPassword(auth, email, password);
            }
        } catch (error: any) {
            setLoginError(error.message);
        }
    };

    return (
        <View style={LoginStyles.viewContainer}>
            {/* Background Image */}
            <ImageBackground style={LoginStyles.backgroundImage}
                source={require('../assets/images/plate-weight.jpg')} 
            >
                {/* Login Area */}
                <View style={LoginStyles.loginContainer}>

                    {/* App Title */}
                    <View style={LoginStyles.titleContainer}>
                        <Text style={LoginStyles.title}>Workout Logger</Text>
                    </View>

                    {/* Username Field */}
                    <View style={LoginStyles.inputContainer}>
                        <TextInput style={LoginStyles.inputs}
                            placeholder="Username"
                            onChangeText={email => setEmail(email)}
                        />
                    </View>

                    {/* Password Field */}
                    <View style={LoginStyles.inputContainer}>
                        <TextInput style={LoginStyles.inputs}
                            placeholder="Password"
                            secureTextEntry={passHide}
                            textContentType='password'
                            autoCompleteType='password'
                            onChangeText={pass => setPassword(pass)}
                        />
                        <Ionicons name={passHide ? "eye-off-sharp" : "eye-sharp"} 
                            size={20} 
                            color="gray"
                            onPress={()=>togglePassHide(!passHide)}
                        />
                    </View>

                    {/* Error message */}
                    {loginError ? <ErrorMessage error={loginError} visible={true} /> : null}

                    {/* Login Button */}
                    <TouchableOpacity style={LoginStyles.buttons}
                        onPress={onLogin}
                    >
                        <Text style={LoginStyles.buttonText}>Login</Text>
                    </TouchableOpacity>

                    {/* Register Link */}
                    <View style={LoginStyles.registerContainer}>
                        <Text style={LoginStyles.registerText}>Don't have an account?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
                            <Text style={LoginStyles.links}> Sign Up!</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
}

export default LoginScreen;