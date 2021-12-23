import React, { useState } from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons'
import { ErrorMessage } from '../components';
import CommonStyles from '../styles/Common';
import { StatusBar } from 'expo-status-bar';
import { ErrorMessages } from '../config/constants';
import {supabase} from '../config/supabase'
import moment from 'moment';
import Common from '../styles/Common';

const RegisterScreen = ({ navigation }: any) =>  {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [month, setMonth] = useState({value: ''});
    const [day, setDay] = useState({value: ''});
    const [year, setYear] = useState({value: ''});
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passHide, togglePassHide] = useState(true);
    const [confirmPassHide, toggleConfirmPassHide] = useState(true);
    const [loginError, setLoginError] = useState('');
    const [yearValid, setYearValid] = useState(true);
    const [monthValid, setMonthValid] = useState(true);
    const [dayValid, setDayValid] = useState(true);
    const [emailValid, setEmailValid] = useState(true);
    const [passwordMatch, setPasswordMatch] = useState(true);

    const validateDateOfBirth = (year:string, month: string, day: string) => {
        if(year.length == 4 && month.length == 2 && day.length == 2 && moment(year + '-' + month + '-' + day).isValid()) {
            setYearValid(true);
            setMonthValid(true);
            setDayValid(true);
        } else if(year.length == 4 && month.length == 2 && day.length == 2 && !moment(year + '-' + month + '-' + day).isValid()){
            setYearValid(false);
            setMonthValid(false);
            setDayValid(false);
        } else {

            if(day.length == 2 && parseInt(day) < 32 && parseInt(day) > 0) {
                setDayValid(true);
            } else {
                setDayValid(false);
            }

            if(month.length == 2 && parseInt(month) < 13 && parseInt(month) > 0) {
                setMonthValid(true);
            } else {
                setMonthValid(false);
            }

            if(year.length == 4 && parseInt(year) < moment().year() && parseInt(year) > moment().year() - 100) {
                setYearValid(true);
            } else {
                setYearValid(false);
            }
        }

        //remove non-numeric characters
        setYear({value: year.replace(/[^0-9]/g, '')});
        setMonth({value: month.replace(/[^0-9]/g, '')});
        setDay({value: day.replace(/[^0-9]/g, '')});
    }

    const validateEmail = (email: string) => {
        if(email.indexOf('@') > 0)
            setEmailValid(true);
        else    
            setEmailValid(false);
        
        setEmail(email);
    };

    const validatePasswordMatch = (pass: string) => {
        if(pass == password) {
            setPasswordMatch(true);
        } else {
            setPasswordMatch(false);
        }

        setConfirmPassword(pass);
    }
    
    const onRegister = async () => {
        if (firstName !== '' && lastName !== '' && monthValid && dayValid && yearValid && emailValid && password !== '' && passwordMatch) {
            const { user, error } = await supabase.auth.signUp(
                {
                    email: email, 
                    password: password
                },
                {
                    data: {
                        first_name: firstName,
                        last_name: lastName,
                        date_of_birth: new Date(parseInt(year.value), parseInt(month.value), parseInt(day.value))
                    }
                });

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
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={CommonStyles.viewContainer}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={CommonStyles.viewContainer}>
                    {/* Status Bar */}
                    <StatusBar style="light"/>

                    {/* Register Area */}
                    <View style={CommonStyles.registerContainer}>

                        {/* App Title */}
                        <View style={CommonStyles.titleContainer}>
                            <Text style={CommonStyles.title}>Register</Text>
                        </View>

                        {/* First & Last Name Field */}
                        <Text style={CommonStyles.inputLabel}>Name</Text>
                        <View style={CommonStyles.inlineInputRowContainer}>
                            <View style={[CommonStyles.inputContainer, CommonStyles.flexGrow]}>
                                <TextInput
                                    placeholder="First Name"
                                    onChangeText={firstName => setFirstName(firstName)}
                                />
                            </View>
                            <View style={[CommonStyles.inputContainer, CommonStyles.flexGrow]}>
                                <TextInput
                                        placeholder="Last Name"
                                        onChangeText={lastName => setLastName(lastName)}
                                    />
                            </View>
                        </View>

                        {/* DOB Field */}
                        <Text style={CommonStyles.inputLabel}>Date of Birth</Text>
                        <View style={CommonStyles.inlineInputRowContainer}>
                            <View style={monthValid ? [CommonStyles.inputContainer, CommonStyles.flexGrow] : 
                                    [CommonStyles.inputInvalidContainer, CommonStyles.flexGrow]}>
                                <TextInput
                                    placeholder="MM"
                                    keyboardType="numeric"
                                    maxLength={2}
                                    onChangeText={month => validateDateOfBirth(year.value, month, day.value)}
                                    value={month.value}
                                    style={CommonStyles.inlineInput}
                                />
                            </View>
                            <View style={dayValid ? [CommonStyles.inputContainer, CommonStyles.flexGrow] : 
                                    [CommonStyles.inputInvalidContainer, CommonStyles.flexGrow]}>
                                <TextInput
                                        placeholder="DD"
                                        keyboardType="numeric"
                                        maxLength={2}
                                        onChangeText={day => validateDateOfBirth(year.value, month.value, day)}
                                        value={day.value}
                                        style={CommonStyles.inlineInput}
                                    />
                            </View>
                            <View style={yearValid ? [CommonStyles.inputContainer, CommonStyles.flexGrow] : 
                                    [CommonStyles.inputInvalidContainer, CommonStyles.flexGrow]}>
                                <TextInput
                                        placeholder="YYYY"
                                        keyboardType="numeric"
                                        maxLength={4}
                                        onChangeText={year => validateDateOfBirth(year, month.value, day.value)}
                                        value={year.value}
                                        style={CommonStyles.inlineInput}
                                    />
                            </View>
                        </View>

                        {/* Username Field */}
                        <Text style={CommonStyles.inputLabel}>Email</Text>
                        <View style={emailValid ? CommonStyles.inputContainer : CommonStyles.inputInvalidContainer}>
                            <TextInput style={CommonStyles.inputs}
                                placeholder="Email"
                                keyboardType="email-address"
                                onChangeText={email => validateEmail(email)}
                            />
                        </View>

                        {/* Password Field */}
                        <Text style={CommonStyles.inputLabel}>Password</Text>
                        <View style={CommonStyles.inputContainer}>
                            <TextInput style={CommonStyles.inputs}
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
                        <View style={passwordMatch ? CommonStyles.inputContainer : CommonStyles.inputInvalidContainer}>
                            <TextInput style={CommonStyles.inputs}
                                placeholder="Confirm Password"
                                secureTextEntry={confirmPassHide}
                                textContentType='password'
                                autoCompleteType='password'
                                onChangeText={pass => validatePasswordMatch(pass)}
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
                        <TouchableOpacity style={CommonStyles.buttons}
                            onPress={onRegister}
                        >
                            <Text style={CommonStyles.buttonText}>Register</Text>
                        </TouchableOpacity>

                        {/* Register Link */}
                        <View style={CommonStyles.linkContainer}>
                            <Text style={CommonStyles.registerText}>Already have a account?</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                                <Text style={CommonStyles.links}> Login!</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

export default RegisterScreen;