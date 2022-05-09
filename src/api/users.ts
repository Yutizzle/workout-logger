import axios, { CancelTokenSource } from 'axios';
import Constants from 'expo-constants';
import { NewUserData, RegisterData, Program } from '../types';
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

export const getUserProgram = async (source: CancelTokenSource, uuid: string) => {
  const program: Program = await axiosInstance
    .get(`/Users/CurrentProgram`, { cancelToken: source.token, params: { Uuid: uuid } })
    .then((response) => {
      if (Constants.manifest?.extra?.environment === 'Development')
        console.log(JSON.stringify(response, null, 2));

      return response.data;
    })
    .catch((err) => {
      if (!axios.isCancel(err)) errorLogging(err);
    });

  return program;
};

export const putUserProgram = async (uuid: string, programId: number) => {
  // axiosInstance.interceptors.request.use((req) => console.log(JSON.stringify(req, null, 2)));
  const res: number = await axiosInstance
    .put(`/Users/CurrentProgram`, { Uuid: uuid, ProgramId: programId })
    .then((response) => {
      if (Constants.manifest?.extra?.environment === 'Development')
        console.log(JSON.stringify(response, null, 2));

      return response.data;
    })
    .catch((err) => {
      if (!axios.isCancel(err)) errorLogging(err);
    });

  return res;
};
