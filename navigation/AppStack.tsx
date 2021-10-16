import React, { FC } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { WelcomeScreen } from "../screens";
const {Navigator, Screen} = createStackNavigator();

const AppStack : FC = () => {

    return(
        <Navigator screenOptions={{headerShown: false}}>
            <Screen name="WelcomeScreen" component={WelcomeScreen}/>
        </Navigator>
    );

}

export default AppStack;