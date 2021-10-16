import React, { FC } from "react";
import { AuthProvider } from "./AuthenticatedUserProvider";
import MainNav from "./MainNavigation";

export const Routes: FC = () => {
    return(
        <AuthProvider>
            <MainNav />
        </AuthProvider>
    );
}