import React from 'react';
import { ScrollView, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSelect } from 'react-supabase';
import CommonStyles from '../styles/Common';
import { ProgramsScreenNavigationProp } from '../types';
import { HeaderBackOnly } from '../components/Header';

function ProgramsScreen({ navigation }: ProgramsScreenNavigationProp) {
  const [result] = useSelect('program', {
    columns: `
            program_id:id,
            program_name,
            user_program_id:user_program(id)
        `,
  });

  console.log(result.data);

  return (
    <View style={CommonStyles.viewContainer}>
      <StatusBar />
      <HeaderBackOnly headerTitle="My Programs" />
      {/* Workout */}
      <ScrollView contentContainerStyle={CommonStyles.flexGrow} />
    </View>
  );
}

export default ProgramsScreen;
