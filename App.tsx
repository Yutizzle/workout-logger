// In App.js in a new project

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from '@use-expo/font';
import LoginScreen from './screens/Login';
import RegisterScreen from './screens/Register'

//init stack navigator
const Stack = createNativeStackNavigator();

//init fonts
const customFonts = {
  OpenSans: require("./assets/fonts/OpenSans-Regular.ttf"),
  OpenSansBold: require("./assets/fonts/OpenSans-Bold.ttf")
};

function App() {
  // the same as Font.loadAsync , the hook returns  true | error 
  const [isLoaded] = useFonts(customFonts);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;