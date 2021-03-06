import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Header } from 'react-native-elements';

import CommonStyles from '../styles/Common';
import { MenuScreenUseNavigationProp } from '../types';

type HeaderProps = {
  headerTitle: string;
};

export function HeaderMenuOnly({ headerTitle }: HeaderProps) {
  const navigation = useNavigation<MenuScreenUseNavigationProp>();
  return (
    <Header
      backgroundColor=""
      backgroundImageStyle={{}}
      barStyle="default"
      centerComponent={<Text style={CommonStyles.headerTitle}>{headerTitle}</Text>}
      centerContainerStyle={CommonStyles.justifyCenter}
      containerStyle={CommonStyles.headerContainer}
      leftComponent={
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('MenuScreen');
          }}
        >
          <View style={CommonStyles.rotate90}>
            <MaterialIcons name="bar-chart" style={CommonStyles.headerIcons} />
          </View>
        </TouchableOpacity>
      }
      leftContainerStyle={CommonStyles.justifyCenter}
      placement="center"
      rightComponent={{}}
      rightContainerStyle={CommonStyles.justifyCenter}
      statusBarProps={{}}
    />
  );
}

export function HeaderBackOnly({ headerTitle }: HeaderProps) {
  const navigation = useNavigation<MenuScreenUseNavigationProp>();
  return (
    <Header
      backgroundColor=""
      backgroundImageStyle={{}}
      barStyle="default"
      centerComponent={<Text style={CommonStyles.headerTitle}>{headerTitle}</Text>}
      centerContainerStyle={CommonStyles.justifyCenter}
      containerStyle={CommonStyles.headerContainer}
      leftComponent={
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <AntDesign name="arrowleft" style={CommonStyles.headerIcons} />
        </TouchableOpacity>
      }
      leftContainerStyle={CommonStyles.justifyCenter}
      placement="center"
      rightComponent={{}}
      rightContainerStyle={CommonStyles.justifyCenter}
      statusBarProps={{}}
    />
  );
}

export function HeaderBackAndMenu({ headerTitle }: HeaderProps) {
  const navigation = useNavigation<MenuScreenUseNavigationProp>();
  return (
    <Header
      backgroundColor=""
      backgroundImageStyle={{}}
      barStyle="default"
      centerComponent={<Text style={CommonStyles.headerTitle}>{headerTitle}</Text>}
      centerContainerStyle={CommonStyles.justifyCenter}
      containerStyle={CommonStyles.headerContainer}
      leftComponent={
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <AntDesign name="arrowleft" style={CommonStyles.headerIcons} />
        </TouchableOpacity>
      }
      leftContainerStyle={CommonStyles.justifyCenter}
      placement="center"
      rightComponent={
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('MenuScreen');
          }}
        >
          <View style={CommonStyles.rotate90}>
            <MaterialIcons name="bar-chart" style={CommonStyles.headerIcons} />
          </View>
        </TouchableOpacity>
      }
      rightContainerStyle={CommonStyles.justifyCenter}
      statusBarProps={{}}
    />
  );
}
