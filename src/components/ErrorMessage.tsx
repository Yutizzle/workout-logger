import React from 'react';
import { Text } from 'react-native';
import CommonStyles from '../styles/Common';

// init functional component prop types
type Error = {
  error: string | null;
  visible: boolean;
};

// Error message component
function ErrorMessage(props: Error) {
  const { error, visible } = props;
  if (!error || !visible) return null;
  return <Text style={CommonStyles.errorText}>{error}</Text>;
}

export default ErrorMessage;
