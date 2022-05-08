import { IncrFrequency, NewProgram, ProgramList } from '../types';
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
  return frequencies;
};

export const createNewProgram = async (program: NewProgram) => {
  const session = supabase.auth.session();
  headers.Authorization = `Bearer ${session?.access_token}`;

  const programId: number = await axiosInstance
    .put(`/programs/create`, program)
    .then((response) => response.data.programId)
    .catch((err) => {
      errorLogging(err);
    });

  return programId;
};
