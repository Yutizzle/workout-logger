import Constants from 'expo-constants';
import axios, { HeadersDefaults } from 'axios';

export const instance = axios.create({
  baseURL: Constants.manifest?.extra?.baseURL,
  headers: {
    Authorization: `Bearer ${Constants.manifest?.extra?.devSupabaseAnonKey}`,
  },
});

export const headers = instance.defaults.headers as HeadersDefaults & { Authorization: string };

export default instance;
