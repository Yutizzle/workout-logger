import { Entypo, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';

import CommonStyles from '../styles/Common';
import { ListItem, RenderItem } from '../types';

type Props = {
  flatListData: ListItem[];
  refresh: boolean;
  renderItem?: (props: RenderItemParams<RenderItem>) => JSX.Element;
  setData: (data: ListItem[]) => void;
  addItem: (index: number) => void;
  removeItem: (index: number) => void;
  goToSettings?: (item: ListItem) => void;
};

export default function DraggableConfigList({
  flatListData,
  refresh,
  renderItem,
  setData,
  addItem,
  removeItem,
  goToSettings,
}: Props) {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const defaultRenderItem = ({ item, drag, isActive }: RenderItemParams<RenderItem>) => (
    <ScaleDecorator>
      <TouchableOpacity
        onLongPress={drag}
        disabled={isActive}
        style={[
          CommonStyles.flexDirectionRow,
          CommonStyles.alignCenter,
          CommonStyles.justifyCenter,
          CommonStyles.alignCenter,
          CommonStyles.padding10,
          CommonStyles.flatListItem,
          {
            backgroundColor: isActive ? '#ffdf64' : '#f9f9f9',
          },
        ]}
      >
        <View
          style={[CommonStyles.flexDirectionRow, CommonStyles.flexGrow, CommonStyles.alignCenter]}
        >
          <View style={[CommonStyles.flexDirectionRow, CommonStyles.flexGrow]}>
            <MaterialCommunityIcons name="drag-vertical" size={26} />
            <Text numberOfLines={1} style={[CommonStyles.todoTextHead, CommonStyles.flex]}>
              {item.label}
            </Text>
          </View>
        </View>
        <View style={CommonStyles.padding6}>
          <TouchableOpacity
            disabled={buttonDisabled}
            onPress={() => {
              if (goToSettings) goToSettings(item);
            }}
          >
            <MaterialIcons name="settings" size={26} style={CommonStyles.textDark} />
          </TouchableOpacity>
        </View>
        <View style={CommonStyles.padding6}>
          <TouchableOpacity
            style={[CommonStyles.inlineButtons, CommonStyles.buttonsPrimary]}
            disabled={buttonDisabled}
            onPress={() => {
              setButtonDisabled(true);
              addItem(item.index);
              setButtonDisabled(false);
            }}
          >
            <MaterialCommunityIcons name="plus" size={26} style={CommonStyles.textLight} />
          </TouchableOpacity>
        </View>
        <View style={CommonStyles.padding6}>
          <TouchableOpacity
            style={[CommonStyles.inlineButtons, CommonStyles.buttonsDelete]}
            disabled={buttonDisabled}
            onPress={() => {
              setButtonDisabled(true);
              removeItem(item.index);
              setButtonDisabled(false);
            }}
          >
            <Entypo name="cross" size={26} style={CommonStyles.textLight} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </ScaleDecorator>
  );

  return (
    <DraggableFlatList
      data={flatListData}
      extraData={refresh}
      onDragEnd={({ data }) => {
        // update index after moving item
        const listData = data.map((item, i) => ({ ...item, index: i }));
        setData(listData);
      }}
      keyExtractor={(item) => item.key}
      renderItem={renderItem || defaultRenderItem}
      containerStyle={[CommonStyles.paddingLefRight10]}
    />
  );
}

DraggableConfigList.defaultProps = {
  renderItem: null,
  goToSettings: null,
};
