import React, { useEffect } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSelect, useFilter } from 'react-supabase';
import CommonStyles from '../styles/Common';
import useAuth from '../hooks/useAuth';
import WorkoutCard from '../components/WorkoutCard';
import { WorkoutExecutionData, WelcomeScreenNavigationProp } from '../types';
import { HeaderMenuOnly } from '../components/Header';

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
