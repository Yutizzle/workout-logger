import axios from 'axios';
import Constants from 'expo-constants';

export const instance = axios.create({
  baseURL: Constants.manifest?.extra?.strengthifyApi,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json;charset=UTF-8',
    Authorization: `Bearer ${Constants.manifest?.extra?.devSupabaseAnonKey}`,
  },
});

export const errorLogging = (err: any) => {
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
    console.error(JSON.stringify(err, null, 2));
  }
};

export default instance;
