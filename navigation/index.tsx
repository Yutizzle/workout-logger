import React, { FC } from "react";
import { AuthProvider } from "./AuthenticatedUserProvider";
import MainNav from "./MainNavigation";

export const Routes: FC = () => {
    // wrap MainNav with AuthProvider component for access to auth context
    return(
        <AuthProvider>
            <MainNav />
        </AuthProvider>
    );
}