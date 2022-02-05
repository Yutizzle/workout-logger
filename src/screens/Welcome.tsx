import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useFilter, useSelect } from 'react-supabase';

import { HeaderMenuOnly } from '../components/Header';
import WorkoutCard from '../components/WorkoutCard';
import useAuth from '../hooks/useAuth';
import CommonStyles from '../styles/Common';
import { WelcomeScreenNavigationProp, WorkoutExecutionData } from '../types';

function WelcomeScreen({ navigation }: WelcomeScreenNavigationProp) {
  // get AuthContext
  const { user } = useAuth();

  const filter = useFilter((query) => query.eq('user_id', user?.id), [user?.id]);

  const [result, getUserData] = useSelect<WorkoutExecutionData>('user_workout_exercise', {
    columns: `
            program_id,
            program_run,
            current_program_cycle,
            workout_history_id,
            workout_id,
            workout_name,
            exercise,
            set,
            reps,
            weight,
            set_duration,
            next_program_cycle,
            next_workout_id,
            completed,
            set_completed,
            reps_completed,
            weight_completed,
            set_duration_completed
        `,
    filter,
  });

  const data: WorkoutExecutionData[] = result.data ?? [];

  useEffect(() => {
    navigation.addListener('focus', () => getUserData());
  }, [result.fetching, getUserData, navigation]);

  return (
    <View style={CommonStyles.viewContainer}>
      <StatusBar />
      <HeaderMenuOnly headerTitle="Today's Workout" />
      {/* Workout */}
      <ScrollView contentContainerStyle={CommonStyles.flexGrow}>
        {data.length > 0 && <WorkoutCard workoutSets={data} />}
        {data.length === 0 && (
          <View
            style={[
              CommonStyles.viewContainer,
              CommonStyles.justifyCenter,
              CommonStyles.alignCenter,
            ]}
          >
            <Text style={CommonStyles.cardTextHead}>Please select a program in My Programs.</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

export default WelcomeScreen;
