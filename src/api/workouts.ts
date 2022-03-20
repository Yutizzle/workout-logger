import { WorkoutExecutionData } from '../types';
import axiosInstance, { headers } from './axios';
import supabase from './supabase';

export const getCurrentExercises = async (uuid: string) => {
  const session = supabase.auth.session();
  headers.Authorization = `Bearer ${session?.access_token}`;

  let exercises: WorkoutExecutionData[] = [];

  await axiosInstance
    .get(`/workouts/currentexercises?uuid=${uuid}`)
    .then((response) => {
      exercises = response.data.exercises;
    })
    .catch((err) => {
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error(`Server responded with error code ${err.response.status}.`);
        // console.log(err.response);
      } else if (err.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        // console.log(err.request);
        console.error(`No response received from the server.`);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error(`Error: ${err.message}`);
      }
    });

  return exercises;
};

export const getPrograms = () => {};
