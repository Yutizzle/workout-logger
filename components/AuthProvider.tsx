import React, { useState, createContext, useEffect, ReactNode } from 'react';
import { supabase } from '../config/supabase';
import { Session } from '@supabase/supabase-js'

//init AuthContext prop types
interface AuthUser {
    userSession: Session | null;
}

type Props = {
    children: ReactNode;
}

//create AuthContext
export const AuthContext = createContext<AuthUser>({userSession: null});

//AuthProvider component
export const AuthProvider = (props: Props) => {
    //user null = loading
    const [userSession, setSession] = useState<Session | null>(null);
	
    //get and set user session with supabase auth
    useEffect(() => {
		const userSession = supabase.auth.session();
		setSession(userSession);

		supabase.auth.onAuthStateChange((_event, session) => {
		  setSession(session);
		});
	  }, []);

    return (
        <AuthContext.Provider value={{ userSession }}>
            {props.children}
        </AuthContext.Provider>
    );
};