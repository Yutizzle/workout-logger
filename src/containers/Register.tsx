import React, { useState } from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons'
import { ErrorMessage } from '../components';
import CommonStyles from '../styles/Common';
import { StatusBar } from 'expo-status-bar';
import { ErrorMessages } from '../api/constants';
import { format, isExists, getYear, subYears } from 'date-fns';
import { useInsert, useSignUp } from 'react-supabase';
import { RegisterData } from '../common/types';


const RegisterScreen = ({ navigation }: any) =>  {
    const [passHide, togglePassHide] = useState(true);
    const [confirmPassHide, toggleConfirmPassHide] = useState(true);
    const [signUpError, setSignUpError] = useState('');

    const initRegisterData: RegisterData = {
        firstName: '',
        lastName: '',
        month: '',
        day: '',
        year: '',
        dateOfBirth: '',
        email: '',
        password: '',
        confirmPassword: '',
        yearValid: true,
        monthValid: true,
        dayValid: true,
        emailValid: true,
        passwordMatch: true
    };

    const [registerData, setRegisterData] = useState<RegisterData>(initRegisterData);
    const [useSignUpState, signUp] = useSignUp();
    const [useUpdateState, insertUserData] = useInsert('user');

    const validateDateOfBirth = async (y:string, m: string, d: string) => {
        const numYear = parseInt(y, 10);
        const numMonth = parseInt(m, 10);
        const numDay = parseInt(d, 10);
        const today = new Date();
        const maxDOB = subYears(today, 100);
        let yearValid = false;
        let monthValid = false;
        let dayValid = false;
        let dateOfBirth = '';

        //validation for all dob fields filled
        if(y.length == 4 && m.length == 2 && d.length == 2) {
            if(numYear > getYear(maxDOB) && numYear <= getYear(today) && isExists(numYear, numMonth - 1, numDay)) {
                dateOfBirth = format(new Date(numYear, numMonth, numDay), 'yyyy-MM-dd');
                yearValid = true;
                monthValid = true;
                dayValid = true;
            }
        //validation for dob fields filled partially    
        } else {
            
            if(numDay < 32 && numDay > 0) {
                dayValid = true;
            } 

            if(numMonth < 13 && numMonth > 0) {
                monthValid = true;
            } 

            if(numYear > getYear(maxDOB)) {
                yearValid = true;
            }
        }
        
        //remove non-numeric characters
        setRegisterData({...registerData, 
            year: y.replace(/[^0-9]/g, ''),
            month: m.replace(/[^0-9]/g, ''),
            day: d.replace(/[^0-9]/g, ''),
            yearValid: yearValid,
            monthValid: monthValid,
            dayValid: dayValid,
            dateOfBirth: dateOfBirth
        });
    }

    const validateEmail = (email: string) => {
        if(email.indexOf('@') > 0)
            setRegisterData({...registerData, emailValid: true, email: email});
        else    
            setRegisterData({...registerData, emailValid: false, email: email});
    };

    const validatePasswordMatch = (pass: string) => {
        if(pass == registerData.password)
            setRegisterData({...registerData, passwordMatch: true, confirmPassword: pass});
        else
            setRegisterData({...registerData, passwordMatch: false, confirmPassword: pass});
    }
    
    const onRegister = async () => {
        if (registerData.firstName !== '' && 
            registerData.lastName !== '' && 
            registerData.monthValid && 
            registerData.dayValid && 
            registerData.yearValid && 
            registerData.emailValid && 
            registerData.password !== '' && 
            registerData.passwordMatch) {
            
            const { error, session, user } = await signUp({
                    email: registerData.email, 
                    password: registerData.password
                });

            if(error) {
                setSignUpError(error.message);
                console.log('error:', error);

            } else if(!error && user){

                const { count, data, error } = await insertUserData(
                    { 
                        id: user.id,
                        first_name: registerData.firstName,
                        last_name: registerData.lastName,
                        email: registerData.email,
                        date_of_birth: registerData.dateOfBirth,
                        created_by: user.id
                    }
                );

                if(error) {
                    console.log('error:', error);
                }
            }
        } else if (registerData.firstName == '' && registerData.lastName == '') {
            setSignUpError(ErrorMessages.EMPTY_NAME);
        } else if(!registerData.monthValid || !registerData.dayValid || !registerData.yearValid) {
            setSignUpError(ErrorMessages.DOB_INVALID);
        } else if(!registerData.emailValid) {
            setSignUpError(ErrorMessages.EMAIL_INVALID);
        } else if(!registerData.passwordMatch) {
            setSignUpError(ErrorMessages.PASSWORDS_NOT_MATCH)
        } else {
            setSignUpError(ErrorMessages.EMPTY_LOGIN_FIELD);
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
                                        onChangeText={firstName => setRegisterData({...registerData, firstName: firstName.replace(/[^a-zA-Z]/g, '')})}
                                        value={registerData.firstName}
                                    />
                                </View>
                            </View>
                            <View style={[CommonStyles.inputSpacerLeft, CommonStyles.flexGrow, CommonStyles.halfBasis]}>
                                <View style={[CommonStyles.inputContainer, CommonStyles.flexGrow]}>
                                    <TextInput
                                            placeholder="Last Name"
                                            onChangeText={lastName => setRegisterData({...registerData, lastName: lastName.replace(/[^a-zA-Z]/g, '')})}
                                            value={registerData.lastName}
                                        />
                                </View>
                            </View>
                        </View>

                        {/* DOB Field */}
                        <Text style={CommonStyles.inputLabel}>Date of Birth</Text>
                        <View style={CommonStyles.inlineInputRowContainer}>
                            <View style={[CommonStyles.inputSpacerRight, CommonStyles.flexGrow, CommonStyles.thirdBasis]}>
                                <View style={registerData.monthValid ? [CommonStyles.inputContainer, CommonStyles.flexGrow] : 
                                        [CommonStyles.inputInvalidContainer, CommonStyles.flexGrow, CommonStyles.marginRightSm]}>
                                    <TextInput
                                        placeholder="MM"
                                        keyboardType="numeric"
                                        maxLength={2}
                                        onChangeText={month => validateDateOfBirth(registerData.year, month, registerData.day)}
                                        value={registerData.month}
                                        style={CommonStyles.inlineInput}
                                    />
                                </View>
                            </View>
                            <View style={[CommonStyles.inputSpacerLeft, CommonStyles.inputSpacerRight, CommonStyles.flexGrow, CommonStyles.thirdBasis]}>
                                <View style={registerData.dayValid ? [CommonStyles.inputContainer, CommonStyles.flexGrow, CommonStyles.marginRightSm] : 
                                        [CommonStyles.inputInvalidContainer, CommonStyles.flexGrow, CommonStyles.marginRightSm]}>
                                    <TextInput
                                            placeholder="DD"
                                            keyboardType="numeric"
                                            maxLength={2}
                                            onChangeText={day => validateDateOfBirth(registerData.year, registerData.month, day)}
                                            value={registerData.day}
                                            style={CommonStyles.inlineInput}
                                        />
                                </View>
                            </View>
                            <View style={[CommonStyles.inputSpacerLeft, CommonStyles.flexGrow, CommonStyles.thirdBasis]}>
                                <View style={registerData.yearValid ? [CommonStyles.inputContainer, CommonStyles.flexGrow] : 
                                        [CommonStyles.inputInvalidContainer, CommonStyles.flexGrow]}>
                                    <TextInput
                                            placeholder="YYYY"
                                            keyboardType="numeric"
                                            maxLength={4}
                                            onChangeText={year => validateDateOfBirth(year, registerData.month, registerData.day)}
                                            value={registerData.year}
                                            style={CommonStyles.inlineInput}
                                        />
                                </View>
                            </View>
                        </View>

                        {/* Username Field */}
                        <Text style={CommonStyles.inputLabel}>Email</Text>
                        <View style={registerData.emailValid ? CommonStyles.inputContainer : CommonStyles.inputInvalidContainer}>
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
                                onChangeText={pass => setRegisterData({...registerData, password: pass})}
                            />
                            <Ionicons name={passHide ? "eye-off-sharp" : "eye-sharp"} 
                                size={20} 
                                color="gray"
                                onPress={()=>togglePassHide(!passHide)}
                            />
                        </View>

                        {/* Confirm Password Field */}
                        <View style={registerData.passwordMatch ? CommonStyles.inputContainer : CommonStyles.inputInvalidContainer}>
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
                        {signUpError ? <ErrorMessage error={signUpError} visible={true} /> : null}

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