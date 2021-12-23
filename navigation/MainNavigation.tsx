import React, {useState, useEffect, useContext} from "react";
//import { getAuth, onAuthStateChanged, User} from 'firebase/auth'
import {supabase} from '../config/supabase'
import { Session } from '@supabase/supabase-js';
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "../components/AuthProvider";
import AppStack from './AppStack'
import AuthStack from "./AuthStack";

const MainNav = () => {
    //get AuthContext
    const auth = useContext(AuthContext);
    const userSession = auth.userSession;

    // show AuthStack if user not logged in
    return(
        <NavigationContainer>
            {userSession == null ? <AuthStack/> : <AppStack />}
        </NavigationContainer>
    );
}

export default MainNav;