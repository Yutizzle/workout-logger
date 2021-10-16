// In App.js in a new project

import React, { FC } from 'react';
import './config/firebase'
import AppLoading from 'expo-app-loading';
import { useFonts, OpenSans_400Regular, OpenSans_700Bold } from '@expo-google-fonts/open-sans';
import { Routes } from './navigation'

const App : FC = () => {
  let [fontsLoaded] = useFonts({
    OpenSans_400Regular,
    OpenSans_700Bold,
  });

  if (!fontsLoaded) {
    return (<AppLoading />);
  } else {
    return (<Routes />);
  }
  
}

export default App;