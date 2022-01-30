type Error = {
  LOGIN_INVALID: string;
  EMPTY_LOGIN_FIELD: string;
  PASSWORDS_NOT_MATCH: string;
  EMPTY_NAME: string;
  DOB_INVALID: string;
  EMAIL_INVALID: string;
};

const ErrorMessages: Error = {
  LOGIN_INVALID: 'Username or password is incorrect.',
  EMPTY_LOGIN_FIELD: 'Please enter a username and password.',
  PASSWORDS_NOT_MATCH: 'Passwords do not match.',
  EMPTY_NAME: 'Please enter your first and last name.',
  DOB_INVALID: 'Please enter a valid date of birth.',
  EMAIL_INVALID: 'Please enter a valid email address.',
};

export default ErrorMessages;
