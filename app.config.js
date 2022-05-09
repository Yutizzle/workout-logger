import 'dotenv/config';

export default {
  name: 'WorkoutLogger',
  version: '1.0.0',
  extra: {
    devSupabaseUrl: process.env.REACT_APP_SUPABASE_URL,
    devSupabaseAnonKey: process.env.REACT_APP_SUPABASE_ANON_KEY,
    strengthifyApi: process.env.STRENGTHIFY_API,
    environment: process.env.ENVIRONMENT,
  },
  android: {
    package: 'com.yutizzle.workoutlogger',
  },
  ios: {
    bundleIdentifier: 'com.yutizzle.workoutlogger',
  },
};
