import React from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import CommonStyles from '../styles/Common';

type HeaderProps = {
  title: string;
};

export default function SectionHeader({ title }: HeaderProps) {
  return (
    <View>
      <Text style={CommonStyles.todoTextHead}>{title}</Text>
      <LinearGradient
        colors={['#284b63', '#fff']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={CommonStyles.dividerGradient}
      />
    </View>
  );
}
