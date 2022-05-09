import Constants from 'expo-constants';
import { IncrFrequency, NewProgram, ProgramList } from '../types';
import axiosInstance, { errorLogging } from './axios';

export const getAllPrograms = async () => {
  const programs: ProgramList[] = await axiosInstance
    .get(`/Programs`)
    .then((response) => {
      if (Constants.manifest?.extra?.environment === 'Development')
        console.log(JSON.stringify(response, null, 2));

      return response.data;
    })
    .catch((err) => {
      errorLogging(err);
    });

  return programs;
};

export const getAllIncrementFreq = async () => {
  const frequencies: IncrFrequency[] = await axiosInstance
    .get(`/programs/incrementfreq`)
    .then((response) => response.data.frequencies)
    .catch((err) => {
      errorLogging(err);
    });
  return frequencies;
};

export const createNewProgram = async (program: NewProgram) => {
  const programId: number = await axiosInstance
    .put(`/programs/create`, program)
    .then((response) => response.data.programId)
    .catch((err) => {
      errorLogging(err);
    });

  return programId;
};
