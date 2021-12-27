import React, { useState } from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons'
import { ErrorMessage } from '../components';
import CommonStyles from '../styles/Common';
import { StatusBar } from 'expo-status-bar';
import { ErrorMessages } from '../config/constants';
import {supabase} from '../config/supabase'
import { format, isExists, getYear, subYears } from 'date-fns';

const RegisterScreen = ({ navigation }: any) =>  {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [month, setMonth] = useState('');
    const [day, setDay] = useState('');
    const [year, setYear] = useState('');
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
    const [dateOfBirth, setDateOfBirth] = useState(format(new Date(), 'yyyy-MM-dd'));

    const validateDateOfBirth = (y:string, m: string, d: string) => {
        const numYear = parseInt(y, 10);
        const numMonth = parseInt(m, 10);
        const numDay = parseInt(d, 10);
        const today = new Date();
        const maxDOB = subYears(today, 100);

        //validation for all dob fields filled
        if(y.length == 4 && m.length == 2 && d.length == 2) {
            if(numYear > getYear(maxDOB) && numYear <= getYear(today) && isExists(numYear, numMonth - 1, numDay)) {
                setYearValid(true);
                setMonthValid(true);
                setDayValid(true);
            } else {
                setYearValid(false);
                setMonthValid(false);
                setDayValid(false);
            }
        //validation for dob fields filled partially    
        } else {

            if(d.length == 2 && numDay < 32 && numDay > 0) {
                setDayValid(true);
            } else {
                setDayValid(false);
            }

            if(m.length == 2 && numMonth < 13 && numMonth > 0) {
                setMonthValid(true);
            } else {
                setMonthValid(false);
            }
            if(y.length == 4 && numYear > getYear(maxDOB)) {
                setYearValid(true);
            } else {
                setYearValid(false);
            }
        }

        //remove non-numeric characters
        setYear(y.replace(/[^0-9]/g, ''));
        setMonth(m.replace(/[^0-9]/g, ''));
        setDay(d.replace(/[^0-9]/g, ''));

        if(yearValid && monthValid && dayValid) {
            setDateOfBirth(format(new Date(numYear, numMonth, numDay), 'yyyy-MM-dd'));
        }
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
                        date_of_birth: dateOfBirth
                    }
                });

            if(error) {
                setLoginError(error.message);
    
                console.log('error:', error);
            }
        } else if (firstName == '' && lastName == '') {
            setLoginError(ErrorMessages.EMPTY_NAME);
        } else if(!monthValid || !dayValid || !yearValid) {
            setLoginError(ErrorMessages.DOB_INVALID);
        } else if(!emailValid) {
            setLoginError(ErrorMessages.EMAIL_INVALID);
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
                            <View style={[CommonStyles.inputSpacerRight, CommonStyles.flexGrow, CommonStyles.halfBasis]}>
                                <View style={[CommonStyles.inputContainer, CommonStyles.flexGrow]}>
                                    <TextInput
                                        placeholder="First Name"
                                        onChangeText={firstName => setFirstName(firstName.replace(/[^a-zA-Z]/g, ''))}
                                        value={firstName}
                                    />
                                </View>
                            </View>
                            <View style={[CommonStyles.inputSpacerLeft, CommonStyles.flexGrow, CommonStyles.halfBasis]}>
                                <View style={[CommonStyles.inputContainer, CommonStyles.flexGrow]}>
                                    <TextInput
                                            placeholder="Last Name"
                                            onChangeText={lastName => setLastName(lastName.replace(/[^a-zA-Z]/g, ''))}
                                            value={lastName}
                                        />
                                </View>
                            </View>
                        </View>

                        {/* DOB Field */}
                        <Text style={CommonStyles.inputLabel}>Date of Birth</Text>
                        <View style={CommonStyles.inlineInputRowContainer}>
                            <View style={[CommonStyles.inputSpacerRight, CommonStyles.flexGrow, CommonStyles.thirdBasis]}>
                                <View style={monthValid ? [CommonStyles.inputContainer, CommonStyles.flexGrow] : 
                                        [CommonStyles.inputInvalidContainer, CommonStyles.flexGrow, CommonStyles.marginRightSm]}>
                                    <TextInput
                                        placeholder="MM"
                                        keyboardType="numeric"
                                        maxLength={2}
                                        onChangeText={month => validateDateOfBirth(year, month, day)}
                                        value={month}
                                        style={CommonStyles.inlineInput}
                                    />
                                </View>
                            </View>
                            <View style={[CommonStyles.inputSpacerLeft, CommonStyles.inputSpacerRight, CommonStyles.flexGrow, CommonStyles.thirdBasis]}>
                                <View style={dayValid ? [CommonStyles.inputContainer, CommonStyles.flexGrow, CommonStyles.marginRightSm] : 
                                        [CommonStyles.inputInvalidContainer, CommonStyles.flexGrow, CommonStyles.marginRightSm]}>
                                    <TextInput
                                            placeholder="DD"
                                            keyboardType="numeric"
                                            maxLength={2}
                                            onChangeText={day => validateDateOfBirth(year, month, day)}
                                            value={day}
                                            style={CommonStyles.inlineInput}
                                        />
                                </View>
                            </View>
                            <View style={[CommonStyles.inputSpacerLeft, CommonStyles.flexGrow, CommonStyles.thirdBasis]}>
                                <View style={yearValid ? [CommonStyles.inputContainer, CommonStyles.flexGrow] : 
                                        [CommonStyles.inputInvalidContainer, CommonStyles.flexGrow]}>
                                    <TextInput
                                            placeholder="YYYY"
                                            keyboardType="numeric"
                                            maxLength={4}
                                            onChangeText={year => validateDateOfBirth(year, month, day)}
                                            value={year}
                                            style={CommonStyles.inlineInput}
                                        />
                                </View>
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