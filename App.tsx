import React from 'react';
import AppLoading from 'expo-app-loading';
import { useFonts, OpenSans_400Regular, OpenSans_700Bold } from '@expo-google-fonts/open-sans';
import { Provider } from 'react-supabase';
import Routes from './src/navigation';
import { supabase } from './src/api/supabase';

function App() {
  // load google fonts with useFonts
  const [fontsLoaded] = useFonts({
    OpenSans_400Regular,
    OpenSans_700Bold,
  });

  // show expo loading indicator if fonts not loaded yet
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  // show Routes component
  return (
    <Provider value={supabase}>
      <Routes />
    </Provider>
  );
}

export default App;
