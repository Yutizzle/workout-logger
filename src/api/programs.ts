import { IncrFrequency, ProgramList } from '../types';
import axiosInstance, { errorLogging, headers } from './axios';
import supabase from './supabase';

export const getAllPrograms = async (uuid: string) => {
  const session = supabase.auth.session();
  headers.Authorization = `Bearer ${session?.access_token}`;

  const programs: ProgramList[] = await axiosInstance
    .get(`/programs?uuid=${uuid}`)
    .then((response) => response.data.programs)
    .catch((err) => {
      errorLogging(err);
    });

  return programs;
};

export const getAllIncrementFreq = async () => {
  const session = supabase.auth.session();
  headers.Authorization = `Bearer ${session?.access_token}`;

  const frequencies: IncrFrequency[] = await axiosInstance
    .get(`/programs/incrementfreq`)
    .then((response) => response.data.frequencies)
    .catch((err) => {
      errorLogging(err);
    });
  console.log(frequencies);
  return frequencies;
};
