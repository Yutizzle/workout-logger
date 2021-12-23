import React from "react";
import { Text } from "react-native";
import CommonStyles from "../styles/Common";

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
        return <Text style={CommonStyles.errorText}>{props.error}</Text>;
}

export default ErrorMessage;