import React, {FC, useContext, useEffect} from "react";
import { getAuth, onAuthStateChanged, User} from 'firebase/auth'
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "./AuthenticatedUserProvider";
import AppStack from './AppStack'
import AuthStack from "./AuthStack";

const auth = getAuth();

const MainNav : FC = () => {
    const { user, setUser } = useContext(AuthContext);
    
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
    
    return(
        <NavigationContainer>
            {user !== null ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
    );
}

export default MainNav;