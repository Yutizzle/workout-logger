import Constants from 'expo-constants';
import { Session, User } from '@supabase/supabase-js';
import React, { ReactNode, createContext, useEffect, useState } from 'react';
import { useAuthStateChange, useClient } from 'react-supabase';
import axiosInstance from '../api/axios';

// init AuthContext prop types
type AuthUser = {
  session: Session | null;
  user: User | null;
};

type Props = {
  children: ReactNode;
};

// create AuthContext
const initialState = { session: null, user: null };
export const AuthContext = createContext<AuthUser>(initialState);

// AuthProvider component
export function AuthProvider({ children }: Props) {
  // user null = loading
  const [state, setState] = useState<AuthUser>(initialState);
  const client = useClient();

  // get and set user session with supabase auth
  useEffect(() => {
    const session = client.auth.session();
    setState({ session, user: session?.user ?? null });
  }, [client.auth]);

  useAuthStateChange((event, session) => {
    setState({ session, user: session?.user ?? null });
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${
      session?.access_token ?? Constants.manifest?.extra?.devSupabaseAnonKey
    }`;
  });

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
}
