import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import {
  MenuScreen,
  NewProgramScreen,
  ProgramsScreen,
  WelcomeScreen,
  WorkoutScreen,
} from '../screens';
import { AppStackParamList } from '../types';

const { Navigator, Screen } = createStackNavigator<AppStackParamList>();

function AppStack() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="WelcomeScreen" component={WelcomeScreen} />
      <Screen name="MenuScreen" component={MenuScreen} />
      <Screen name="WorkoutScreen" component={WorkoutScreen} />
      <Screen name="ProgramsScreen" component={ProgramsScreen} />
      <Screen name="NewProgramScreen" component={NewProgramScreen} />
    </Navigator>
  );
}

export default AppStack;
