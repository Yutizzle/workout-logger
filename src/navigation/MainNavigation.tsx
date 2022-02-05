import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import useAuth from '../hooks/useAuth';
import AppStack from './AppStack';
import AuthStack from './AuthStack';

function MainNav() {
  // get AuthContext
  const { session } = useAuth();

  // show AuthStack if user not logged in
  return (
    <NavigationContainer>{session == null ? <AuthStack /> : <AppStack />}</NavigationContainer>
  );
}

export default MainNav;
