import React, { useState, createContext, useEffect, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { useClient, useAuthStateChange } from 'react-supabase';

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
export function AuthProvider(props: Props) {
  // user null = loading
  const [state, setState] = useState<AuthUser>(initialState);
  const client = useClient();
  const { children } = props;

  // get and set user session with supabase auth
  useEffect(() => {
    const session = client.auth.session();
    setState({ session, user: session?.user ?? null });
  }, [client.auth]);

  useAuthStateChange((event, session) => {
    setState({ session, user: session?.user ?? null });
  });

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
}
