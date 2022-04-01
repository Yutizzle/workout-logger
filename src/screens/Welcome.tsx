import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getCurrentExercises } from '../api/workouts';
import { HeaderMenuOnly } from '../components/Header';
import WorkoutCard from '../components/WorkoutCard';
import useAuth from '../hooks/useAuth';
import CommonStyles from '../styles/Common';
import { WelcomeScreenNavigationProp, WorkoutExecutionData } from '../types';

function WelcomeScreen({ navigation }: WelcomeScreenNavigationProp) {
  // get AuthContext
  const { user } = useAuth();
  const [data, setData] = useState<WorkoutExecutionData[]>([]);

  useEffect(() => {
    navigation.addListener('focus', async () => {
      const exercises = await getCurrentExercises(user?.id ?? '');
      setData(exercises);
    });
  }, [navigation, user?.id]);

  return (
    <SafeAreaView
      style={[
        CommonStyles.flex,
        CommonStyles.flexGrow,
        CommonStyles.backgroundColor,
        CommonStyles.padding10,
      ]}
    >
      <StatusBar />
      <View style={[CommonStyles.flexShrink]}>
        <HeaderMenuOnly headerTitle="Today's Workout" />
      </View>
      <View style={[CommonStyles.viewContainer]}>
        {/* Workout */}
        <ScrollView contentContainerStyle={[CommonStyles.flex, CommonStyles.flexGrow]}>
          {data && data.length > 0 && <WorkoutCard workoutSets={data} />}
          {(!data || data.length === 0) && (
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
    </SafeAreaView>
  );
}

export default WelcomeScreen;
