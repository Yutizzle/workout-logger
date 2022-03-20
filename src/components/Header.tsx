import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Header } from 'react-native-elements';

import CommonStyles from '../styles/Common';
import { MenuScreenUseNavigationProp } from '../types';

type HeaderProps = {
  headerTitle: string;
  onGoBack?: () => void;
};

export function HeaderMenuOnly({ headerTitle, onGoBack }: HeaderProps) {
  const navigation = useNavigation<MenuScreenUseNavigationProp>();
  const [buttonDisabled, setButtonDisabled] = useState(false);

  return (
    <Header
      backgroundColor=""
      backgroundImageStyle={{}}
      barStyle="default"
      centerComponent={<Text style={CommonStyles.headerTitle}>{headerTitle}</Text>}
      centerContainerStyle={{}}
      containerStyle={CommonStyles.headerContainer}
      leftComponent={
        <TouchableOpacity
          disabled={buttonDisabled}
          onPress={() => {
            setButtonDisabled(true);
            if (onGoBack) onGoBack();
            else navigation.navigate('MenuScreen');
            setButtonDisabled(false);
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

export function HeaderBackOnly({ headerTitle, onGoBack }: HeaderProps) {
  const navigation = useNavigation<MenuScreenUseNavigationProp>();
  const [buttonDisabled, setButtonDisabled] = useState(false);

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
          disabled={buttonDisabled}
          onPress={() => {
            setButtonDisabled(true);
            if (onGoBack) onGoBack();
            else navigation.goBack();
            setButtonDisabled(false);
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

export function HeaderBackAndMenu({ headerTitle, onGoBack }: HeaderProps) {
  const navigation = useNavigation<MenuScreenUseNavigationProp>();
  const [buttonDisabled, setButtonDisabled] = useState(false);

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
          disabled={buttonDisabled}
          onPress={() => {
            setButtonDisabled(true);
            if (onGoBack) onGoBack();
            else navigation.goBack();
            setButtonDisabled(false);
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

HeaderMenuOnly.defaultProps = {
  onGoBack: null,
};

HeaderBackOnly.defaultProps = {
  onGoBack: null,
};

HeaderBackAndMenu.defaultProps = {
  onGoBack: null,
};
