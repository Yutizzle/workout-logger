import React, { useState, createContext, FC, Dispatch, SetStateAction} from 'react';
import { User } from 'firebase/auth'

//define react context types
export type AuthUser = {
    user: User | null;
    setUser: Dispatch<SetStateAction<User | null>>;
}

//create react context -- default values null / empty function
export const AuthContext = createContext<AuthUser>({user: null, setUser: () => {}});

//AuthProvider component
export const AuthProvider : FC = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};