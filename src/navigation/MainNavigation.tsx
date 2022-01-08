import React, {useState, useEffect, useContext} from "react";
//import { getAuth, onAuthStateChanged, User} from 'firebase/auth'
import {supabase} from '../api/supabase'
import { Session } from '@supabase/supabase-js';
import { NavigationContainer } from "@react-navigation/native";
import AppStack from './AppStack'
import AuthStack from "./AuthStack";
import { useAuth } from "../hooks/useAuth";

const MainNav = () => {
    //get AuthContext
    const { session, user } = useAuth();

    // show AuthStack if user not logged in
    return(
        <NavigationContainer>
            {session == null ? <AuthStack/> : <AppStack />}
        </NavigationContainer>
    );
}

export default MainNav;