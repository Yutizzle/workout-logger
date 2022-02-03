import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppStack from './AppStack';
import AuthStack from './AuthStack';
import useAuth from '../hooks/useAuth';

function MainNav() {
  // get AuthContext
  const { session } = useAuth();

  // show AuthStack if user not logged in
  return (
    <NavigationContainer>{session == null ? <AuthStack /> : <AppStack />}</NavigationContainer>
  );
}

export default MainNav;
