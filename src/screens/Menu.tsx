import React from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSignOut } from 'react-supabase';
import { useNavigation } from '@react-navigation/native';
import CommonStyles from '../styles/Common';
import { HeaderBackOnly } from '../components/Header';
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
  const navigation = useNavigation<MenuScreenUseNavigationProp>();

  const signout = async () => {
    await signOut();
    if (signOutState.error) {
      // console.log('error:', signOutState.error);
    }
  };

  return (
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
              <Text style={[CommonStyles.buttonText, CommonStyles.textDark]}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default MenuScreen;
