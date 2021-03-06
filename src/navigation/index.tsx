import React from 'react';

import { AuthProvider } from '../components/AuthProvider';
import MainNav from './MainNavigation';

export default function Routes() {
  // wrap MainNav with AuthProvider component for access to auth context
  return (
    <AuthProvider>
      <MainNav />
    </AuthProvider>
  );
}
