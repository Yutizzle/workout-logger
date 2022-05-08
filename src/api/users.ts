import { NewUserData, RegisterData } from '../types';
import axiosInstance, { errorLogging, headers } from './axios';
import supabase from './supabase';

export const registerUser = async (data: RegisterData, onError: (e: any) => void) => {
  const session = supabase.auth.session();
  headers.Authorization = `Bearer ${session?.access_token}`;

  const { firstName, lastName, dateOfBirth, email, password } = data;
  const newUserData: NewUserData = {
    first_name: firstName,
    last_name: lastName,
    date_of_birth: dateOfBirth,
    email,
    password,
  };

  const userToken: string = await axiosInstance
    .put(`/users/register`, { data: newUserData })
    .then((response) => response.data.refresh_token)
    .catch((err) => {
      onError(err);
    });

  return userToken;
};

export const getUserProgram = async (uuid: string) => {
  const session = supabase.auth.session();
  headers.Authorization = `Bearer ${session?.access_token}`;

  const programId: number = await axiosInstance
    .get(`/users/program?uuid=${uuid}`)
    .then((response) => response.data.programs)
    .catch((err) => {
      errorLogging(err);
    });

  return programId;
};
