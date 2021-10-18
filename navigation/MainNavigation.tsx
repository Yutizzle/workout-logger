import React, {useContext, useEffect} from "react";
import { getAuth, onAuthStateChanged, User} from 'firebase/auth'
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "../components/AuthProvider";
import AppStack from './AppStack'
import AuthStack from "./AuthStack";

const auth = getAuth();

const MainNav = () => {
    //get AuthContext
    const { user, setUser } = useContext(AuthContext);
    
    //check and set user on mount
    useEffect(() => {
        const unsubscriber = onAuthStateChanged(auth, async (authenticatedUser: User | null) => {
            try {
                await (authenticatedUser ? setUser(authenticatedUser) : setUser(null));
            } catch(e) {
                console.log(e);
            }
        });
        return unsubscriber;
    },[]);
    
    // show AuthStack if user not logged in
    return(
        <NavigationContainer>
            {user !== null ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
    );
}

export default MainNav;