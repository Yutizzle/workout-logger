import React, { FC } from "react";
import { Text } from "react-native";
import LoginStyles from "../styles/LoginStyles";

// init functional component prop types
type Error = {
    error: String | null;
    visible: Boolean;
}

// Error message component
const ErrorMessage = (props: Error) => {
    if(!props.error || !props.visible)
        return null;
    else
        return <Text style={LoginStyles.errorText}>{props.error}</Text>;
}

export default ErrorMessage;