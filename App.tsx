import { OpenSans_400Regular, OpenSans_700Bold, useFonts } from '@expo-google-fonts/open-sans';
import AppLoading from 'expo-app-loading';
import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { Provider as SupabaseProvider } from 'react-supabase';

import supabase from './src/api/supabase';
import Routes from './src/navigation';
import { store } from './src/store';

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
    <ReduxProvider store={store}>
      <SupabaseProvider value={supabase}>
        <Routes />
      </SupabaseProvider>
    </ReduxProvider>
  );
}

export default App;
