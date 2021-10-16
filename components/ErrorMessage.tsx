import React, { FC } from "react";
import { Text, StyleSheet } from "react-native";

type Error = {
    error: String | null;
    visible: Boolean;
}

const ErrorMessage: FC<Error> = ({ error, visible }) => {
    if(!error || !visible)
        return null;
    else
        return <Text style={errorStyles.text}>{error}</Text>;
}

const errorStyles = StyleSheet.create({
    text: {
        color: 'red'
    }
});
export default ErrorMessage;