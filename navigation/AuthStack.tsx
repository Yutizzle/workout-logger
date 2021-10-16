import React, {FC} from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen, RegisterScreen } from "../screens";
const {Navigator, Screen} = createStackNavigator();

const AuthStack : FC = () => {

    return(
        <Navigator initialRouteName="LoginScreen" screenOptions={{headerShown: false}}>
            <Screen name="LoginScreen" component={LoginScreen}/>
            <Screen name="RegisterScreen" component={RegisterScreen}/>
        </Navigator>
    );

}

export default AuthStack;