import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { HeaderMenuOnly } from '../components/Header';
import WorkoutCard from '../components/WorkoutCard';
import useAuth from '../hooks/useAuth';
import CommonStyles from '../styles/Common';
import { WelcomeScreenNavigationProp, WorkoutExecutionData } from '../types';
import { getCurrentExercises } from '../api/workouts';

function WelcomeScreen({ navigation }: WelcomeScreenNavigationProp) {
  // get AuthContext
  const { session, user } = useAuth();
  const [data, setData] = useState<WorkoutExecutionData[]>([]);

  useEffect(() => {
    navigation.addListener('focus', async () => {
      const exercises = await getCurrentExercises(user?.id ?? '');
      setData(exercises);
    });
  }, [navigation, user?.id, session?.access_token]);

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
