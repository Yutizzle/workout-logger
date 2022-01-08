import React, { FC } from 'react';
import AppLoading from 'expo-app-loading';
import { useFonts, OpenSans_400Regular, OpenSans_700Bold } from '@expo-google-fonts/open-sans';
import { Routes } from './src/navigation'
import { supabase } from './src/api/supabase'
import { Provider } from 'react-supabase';

const App = () => {
  // load google fonts with useFonts
  let [fontsLoaded] = useFonts({
    OpenSans_400Regular,
    OpenSans_700Bold,
  });

  // show expo loading indicator if fonts not loaded yet
  if (!fontsLoaded) {
    return (<AppLoading />);
  } else {
    // show Routes component
    return (
      <Provider value={supabase}>
        <Routes />
      </Provider>
    );
  }
  
}

export default App;