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
    .get(`/users/program?uuid=${uuid}`)
    .then((response) => response.data.programs)
    .catch((err) => {
      errorLogging(err);
    });

  return programId;
};
