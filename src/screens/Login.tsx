import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSignIn } from 'react-supabase';

import ErrorMessages from '../api/constants';
import plateLogo from '../assets/images/plate-weight.jpg';
import { ErrorMessage } from '../components';
import CommonStyles from '../styles/Common';
import { LoginScreenNavigationProp } from '../types';

function LoginScreen({ navigation }: LoginScreenNavigationProp) {
  const [, signIn] = useSignIn();
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passHide, togglePassHide] = useState(true);
  const [loginError, setLoginError] = useState('');

  const onLogin = async () => {
    setButtonDisabled(true);

    if (email !== '' && password !== '') {
      const state = await signIn({
        email,
        password,
      });

      if (state.error) {
        setLoginError(state.error.message);

        // console.log('error:', state.error);
      }
    } else {
      setLoginError(ErrorMessages.EMPTY_LOGIN_FIELD);
    }

    setButtonDisabled(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={CommonStyles.viewContainer}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={CommonStyles.viewContainer}>
          {/* Status Bar */}
          <StatusBar />

          {/* Background Image */}
          <ImageBackground style={CommonStyles.backgroundImage} source={plateLogo}>
            {/* Login Area */}
            <View style={CommonStyles.loginContainer}>
              {/* App Title */}
              <View style={CommonStyles.titleContainer}>
                <Text style={CommonStyles.title}>Workout Logger</Text>
              </View>

              {/* Username Field */}
              <View style={CommonStyles.inputContainer}>
                <TextInput
                  style={CommonStyles.inputs}
                  placeholder="Username"
                  keyboardType="email-address"
                  onChangeText={(em) => setEmail(em)}
                />
              </View>

              {/* Password Field */}
              <View style={CommonStyles.inputContainer}>
                <TextInput
                  style={CommonStyles.inputs}
                  placeholder="Password"
                  secureTextEntry={passHide}
                  textContentType="password"
                  autoCompleteType="password"
                  onChangeText={(pass) => setPassword(pass)}
                />
                <Ionicons
                  name={passHide ? 'eye-off-sharp' : 'eye-sharp'}
                  size={20}
                  color="gray"
                  onPress={() => togglePassHide(!passHide)}
                />
              </View>

              {/* Error message */}
              {loginError ? <ErrorMessage error={loginError} visible /> : null}

              {/* Login Button */}
              <TouchableOpacity
                style={[CommonStyles.buttons, CommonStyles.buttonsPrimary]}
                onPress={async () => {
                  await onLogin();
                }}
              >
                {buttonDisabled ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={[CommonStyles.buttonText, CommonStyles.textLight]}>Login</Text>
                )}
              </TouchableOpacity>

              {/* Register Link */}
              <View style={CommonStyles.linkContainer}>
                <Text style={CommonStyles.registerText}>Don&apos;t have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
                  <Text style={CommonStyles.links}> Sign Up!</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export default LoginScreen;
