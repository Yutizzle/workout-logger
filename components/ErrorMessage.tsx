import React, { FC } from "react";
import { Text } from "react-native";
import LoginStyles from "../styles/LoginStyles";

// init functional component prop types
export type Error = {
    error: String | null;
    visible: Boolean;
}

// Error message component
const ErrorMessage: FC<Error> = ({ error, visible }) => {
    if(!error || !visible)
        return null;
    else
        return <Text style={LoginStyles.errorText}>{error}</Text>;
}

export default ErrorMessage;