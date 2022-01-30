import 'dotenv/config';

export default {
  name: 'WorkoutLogger',
  version: '1.0.0',
  extra: {
    devSupabaseURL: process.env.REACT_APP_SUPABASE_URL,
    devSupabaseAnonKey: process.env.REACT_APP_SUPABASE_ANON_KEY
  },
};