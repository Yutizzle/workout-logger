
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js'

const supabaseUrl:string = 'https://comnwzdkrpnewmjrhowt.supabase.co';
const supabaseAnonKey:string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNTYzMDc3MSwiZXhwIjoxOTUxMjA2NzcxfQ.4Ljuc-U6g6EH-O2olSHMlNF5hd7FrTubBAGhLMrjH7w';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    localStorage: AsyncStorage as any,
    detectSessionInUrl: false
});

export default supabase;
    
    