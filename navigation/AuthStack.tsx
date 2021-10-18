import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen, RegisterScreen } from "../screens";

//create navigation stack
const {Navigator, Screen} = createStackNavigator();

const AuthStack = () => {
    //Navigation for AuthStack, default route: LoginScreen
    return(
        <Navigator initialRouteName="LoginScreen" screenOptions={{headerShown: false}}>
            <Screen name="LoginScreen" component={LoginScreen}/>
            <Screen name="RegisterScreen" component={RegisterScreen}/>
        </Navigator>
    );

}

export default AuthStack;