import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

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
    <View
      style={[CommonStyles.flexDirectionRow, CommonStyles.headerContainer, CommonStyles.padding10]}
    >
      <View style={[CommonStyles.flexShrink, CommonStyles.alignCenter]}>
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
      </View>
      <View style={[CommonStyles.flex, CommonStyles.flexGrow, CommonStyles.alignCenter]}>
        <Text style={CommonStyles.headerTitle}>{headerTitle}</Text>
      </View>
      <View style={[CommonStyles.flexShrink]}>
        <View style={[CommonStyles.rotate90, CommonStyles.opacityNone]}>
          <MaterialIcons name="bar-chart" style={CommonStyles.headerIcons} />
        </View>
      </View>
    </View>
  );
}

export function HeaderBackOnly({ headerTitle, onGoBack }: HeaderProps) {
  const navigation = useNavigation<MenuScreenUseNavigationProp>();
  const [buttonDisabled, setButtonDisabled] = useState(false);

  return (
    <View
      style={[CommonStyles.flexDirectionRow, CommonStyles.headerContainer, CommonStyles.padding10]}
    >
      <View style={[CommonStyles.flexShrink, CommonStyles.alignCenter]}>
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
      </View>
      <View style={[CommonStyles.flex, CommonStyles.flexGrow, CommonStyles.alignCenter]}>
        <Text style={CommonStyles.headerTitle}>{headerTitle}</Text>
      </View>
      <View style={[CommonStyles.flexShrink]}>
        <View style={[CommonStyles.rotate90, CommonStyles.opacityNone]}>
          <AntDesign name="arrowleft" style={CommonStyles.headerIcons} />
        </View>
      </View>
    </View>
  );
}

export function HeaderBackAndMenu({ headerTitle, onGoBack }: HeaderProps) {
  const navigation = useNavigation<MenuScreenUseNavigationProp>();
  const [buttonDisabled, setButtonDisabled] = useState(false);

  return (
    <View
      style={[CommonStyles.flexDirectionRow, CommonStyles.headerContainer, CommonStyles.padding10]}
    >
      <View style={[CommonStyles.flexShrink, CommonStyles.alignCenter]}>
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
      </View>
      <View style={[CommonStyles.flex, CommonStyles.flexGrow, CommonStyles.alignCenter]}>
        <Text style={CommonStyles.headerTitle}>{headerTitle}</Text>
      </View>
      <View style={[CommonStyles.flexShrink]}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('MenuScreen');
          }}
        >
          <View style={CommonStyles.rotate90}>
            <MaterialIcons name="bar-chart" style={CommonStyles.headerIcons} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
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
