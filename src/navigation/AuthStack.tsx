import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { LoginScreen, RegisterScreen } from '../screens';
import { AuthStackParamList } from '../types';

// create navigation stack
const { Navigator, Screen } = createStackNavigator<AuthStackParamList>();

function AuthStack() {
  // Navigation for AuthStack, default route: LoginScreen
  return (
    <Navigator initialRouteName="LoginScreen" screenOptions={{ headerShown: false }}>
      <Screen name="LoginScreen" component={LoginScreen} />
      <Screen name="RegisterScreen" component={RegisterScreen} />
    </Navigator>
  );
}

export default AuthStack;
