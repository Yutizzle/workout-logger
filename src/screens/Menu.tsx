import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSignOut } from 'react-supabase';

import { HeaderBackOnly } from '../components/Header';
import CommonStyles from '../styles/Common';
import { MenuScreenUseNavigationProp } from '../types';

type MenuItemProps = {
  name: string;
  onPress: () => void;
};

function MenuItem({ name, onPress }: MenuItemProps) {
  return (
    <TouchableOpacity style={CommonStyles.menuItemContainer} onPress={onPress}>
      <Text style={[CommonStyles.headerTitle]}>{name}</Text>
    </TouchableOpacity>
  );
}

function MenuScreen() {
  const [signOutState, signOut] = useSignOut();
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const navigation = useNavigation<MenuScreenUseNavigationProp>();

  const signout = async () => {
    setButtonDisabled(true);

    await signOut();
    if (signOutState.error) {
      // console.log('error:', signOutState.error);
    }

    setButtonDisabled(false);
  };

  return (
    <SafeAreaView style={[CommonStyles.flex, CommonStyles.backgroundColor, CommonStyles.padding10]}>
      <View style={CommonStyles.viewContainer}>
        <StatusBar />
        <ScrollView contentContainerStyle={CommonStyles.flexGrow}>
          <HeaderBackOnly headerTitle="Menu" />
          <View style={[CommonStyles.flexGrow, CommonStyles.flexDirectionColumn]}>
            <View style={CommonStyles.flexGrow}>
              <MenuItem
                name="My Programs"
                onPress={() => {
                  navigation.navigate('ProgramsScreen');
                }}
              />
            </View>
            <View style={CommonStyles.flexShrink}>
              <TouchableOpacity
                style={[CommonStyles.buttons, CommonStyles.buttonsSecondary]}
                onPress={async () => {
                  await signout();
                }}
              >
                {buttonDisabled ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={[CommonStyles.buttonText, CommonStyles.textDark]}>Logout</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

export default MenuScreen;
