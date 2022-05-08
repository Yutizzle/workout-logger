import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';
import 'react-native-url-polyfill/auto';

const supabaseUrl = Constants.manifest?.extra?.devSupabaseUrl;
const supabaseAnonKey = Constants.manifest?.extra?.devSupabaseAnonKey;

export default createClient(supabaseUrl, supabaseAnonKey, {
  localStorage: AsyncStorage as any,
  detectSessionInUrl: false,
});
