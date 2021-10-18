import React, { useState, createContext, Dispatch, SetStateAction, ReactNode} from 'react';
import { User } from 'firebase/auth'

//init AuthContext prop types
type AuthUser = {
    user: User | null;
    setUser: Dispatch<SetStateAction<User | null>>;
}

type AuthContextProvider = {
    children: ReactNode;
}

//create AuthContext -- default values: null, empty function
export const AuthContext = createContext<AuthUser>({user: null, setUser: () => {}});

//AuthProvider component
export const AuthProvider = ({ children }: AuthContextProvider) => {
    const [user, setUser] = useState<User | null>(null);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};