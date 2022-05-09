import Constants from 'expo-constants';
import { NewUserData, RegisterData } from '../types';
import axiosInstance, { errorLogging } from './axios';

export const registerUser = async (data: RegisterData, onError: (e: any) => void) => {
  const { firstName, lastName, dateOfBirth, email, password } = data;
  const newUserData: NewUserData = {
    firstName,
    lastName,
    dateOfBirth,
    email,
    password,
  };

  const userToken: string = await axiosInstance
    .post(`/Users`, newUserData)
    .then((response) => response.data.refresh_token)
    .catch((err) => {
      onError(err);
    });

  return userToken;
};

export const getUserProgram = async (uuid: string) => {
  const programId: number = await axiosInstance
    .get(`/Users/CurrentProgram`, { params: { Uuid: uuid } })
    .then((response) => {
      if (Constants.manifest?.extra?.environment === 'Development')
        console.log(JSON.stringify(response, null, 2));

      return response.data.ProgramId;
    })
    .catch((err) => {
      errorLogging(err);
    });

  return programId;
};
