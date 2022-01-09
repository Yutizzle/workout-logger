import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen, RegisterScreen } from "../containers";
import { AuthStackParamList } from "../common/types";

//create navigation stack
const {Navigator, Screen} = createStackNavigator<AuthStackParamList>();

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