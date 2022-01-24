import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { WelcomeScreen, WorkoutScreen, MenuScreen } from "../containers";
import { AppStackParamList } from "../common/types";

const {Navigator, Screen} = createStackNavigator<AppStackParamList>();

const AppStack = () => {

    return(
        <Navigator screenOptions={{headerShown: false}}>
            <Screen name="WelcomeScreen" component={WelcomeScreen}/>
            <Screen name="MenuScreen" component={MenuScreen}/>
            <Screen name="WorkoutScreen" component={WorkoutScreen}/>
        </Navigator>
    );

}

export default AppStack;