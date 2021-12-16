import React, { useState } from 'react';
import { View, ImageBackground, StyleSheet, Text, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons'
import { ErrorMessage } from '../components';
import LoginStyles from '../styles/LoginStyles';
import { StatusBar } from 'expo-status-bar';
import { ErrorMessages } from '../config/constants';
import {supabase} from '../config/supabase'

const RegisterScreen = ({ navigation }: any) =>  {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passHide, togglePassHide] = useState(true);
    const [confirmPassHide, toggleConfirmPassHide] = useState(true);
    const [loginError, setLoginError] = useState('');

    const onRegister = async () => {
        if (email !== '' && password !== '' && confirmPassword !== '' && password == confirmPassword) {
            //await signInWithEmailAndPassword(auth, email, password);
            const { user, error } = await supabase.auth.signUp({email: email, password: password});
            if(error) {
                setLoginError(error.message);
    
                console.log('error:', error);
            }
        } else if(password !== confirmPassword) {
            setLoginError(ErrorMessages.PASSWORDS_NOT_MATCH)
        } else {
            setLoginError(ErrorMessages.EMPTY_LOGIN_FIELD);
        }
        
    };

    return (
        <View style={LoginStyles.viewContainer}>
            {/* Status Bar */}
            <StatusBar style="light"/>

            {/* Register Area */}
            <View style={LoginStyles.loginContainer}>

                {/* App Title */}
                <View style={LoginStyles.titleContainer}>
                    <Text style={LoginStyles.title}>Register</Text>
                </View>

                {/* Username Field */}
                <View style={LoginStyles.inputContainer}>
                    <TextInput style={LoginStyles.inputs}
                        placeholder="Email"
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

                {/* Confirm Password Field */}
                <View style={LoginStyles.inputContainer}>
                    <TextInput style={LoginStyles.inputs}
                        placeholder="Confirm Password"
                        secureTextEntry={confirmPassHide}
                        textContentType='password'
                        autoCompleteType='password'
                        onChangeText={pass => setConfirmPassword(pass)}
                    />
                    <Ionicons name={confirmPassHide ? "eye-off-sharp" : "eye-sharp"} 
                        size={20} 
                        color="gray"
                        onPress={()=>toggleConfirmPassHide(!confirmPassHide)}
                    />
                </View>

                {/* Error message */}
                {loginError ? <ErrorMessage error={loginError} visible={true} /> : null}

                {/* Login Button */}
                <TouchableOpacity style={LoginStyles.buttons}
                    onPress={onRegister}
                >
                    <Text style={LoginStyles.buttonText}>Register</Text>
                </TouchableOpacity>

                {/* Register Link */}
                <View style={LoginStyles.registerContainer}>
                    <Text style={LoginStyles.registerText}>Already have a account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                        <Text style={LoginStyles.links}> Login!</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default RegisterScreen;