import { Entypo, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { RenderItemParams, ScaleDecorator } from 'react-native-draggable-flatlist';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import { DraggableConfigList, HeaderBackOnly, SectionHeader } from '../components';
import CommonStyles from '../styles/Common';
import { EditExerciseScreenNavigationProp } from '../types';

type Item = {
  key: string;
  index: number;
  label: string;
};

export default function EditExerciseScreen({
  navigation,
  route,
}: EditExerciseScreenNavigationProp) {
  const [setsData, setSetsData] = useState<Item[]>([]);
  const [exerciseName, setexerciseName] = useState('');
  const [uniqueId, setUniqueId] = useState(2);
  const [refresh, toggleRefresh] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  useEffect(() => {
    const initialData: Item[] = [...Array(1)].map((_, index) => ({
      key: `item-${index}`,
      index,
      label: `New Set #${index + 1}`,
    }));
    setSetsData(initialData);
  }, [navigation]);

  const saveWorkout = () => {};

  const addSet = (idx: number) => {
    setButtonDisabled(true);
    setUniqueId((prev) => prev + 1);
    setSetsData((prev) => {
      // create data for new row
      const index = prev.length;
      const newData: Item = {
        key: `item-${uniqueId}`,
        index,
        label: `New Set #${uniqueId}`,
      };

      // insert after row
      prev.splice(idx + 1, 0, newData);

      // update all indexes
      return prev.map((data, i) => ({ ...data, index: i }));
    });
    toggleRefresh((prev) => !prev);
    setButtonDisabled(false);
  };

  const removeSet = (idx: number) => {
    setButtonDisabled(true);
    if (setsData.length === 1) {
      Alert.alert('Remove Exercise', `Your workout must contain at least one exercise.`, [
        {
          text: 'OK',
          onPress: () => {
            setButtonDisabled(false);
          },
        },
      ]);
    } else {
      Alert.alert(
        'Remove Exercise',
        `Are you sure you want to remove ${setsData[idx].label} from this workout?`,
        [
          {
            text: 'Cancel',
            onPress: () => {
              // enable all buttons
              setButtonDisabled(false);
            },
          },
          {
            text: 'Remove',
            style: 'destructive',
            onPress: () => {
              setSetsData((prev) => {
                // insert after row
                prev.splice(idx, 1);

                // update all indexes
                return prev.map((data, i) => ({ ...data, index: i }));
              });
              toggleRefresh((prev) => !prev);
              setButtonDisabled(false);
            },
          },
        ]
      );
    }
  };

  const renderItem = ({ item, drag, isActive }: RenderItemParams<Item>) => (
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
          <TouchableOpacity disabled={buttonDisabled} onPress={() => {}}>
            <MaterialIcons name="settings" size={26} style={CommonStyles.textDark} />
          </TouchableOpacity>
        </View>
        <View style={CommonStyles.padding6}>
          <TouchableOpacity
            style={[CommonStyles.inlineButtons, CommonStyles.buttonsPrimary]}
            disabled={buttonDisabled}
            onPress={() => {
              addSet(item.index);
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
              removeSet(item.index);
            }}
          >
            <Entypo name="cross" size={26} style={CommonStyles.textLight} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </ScaleDecorator>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[CommonStyles.viewContainer]}
    >
      <View style={CommonStyles.flexShrink}>
        <HeaderBackOnly headerTitle="Edit Exercise" />
      </View>
      <TouchableWithoutFeedback
        containerStyle={CommonStyles.flexGrow}
        style={CommonStyles.flexGrow}
        onPress={Keyboard.dismiss}
      >
        <View style={[CommonStyles.padding10, CommonStyles.flexShrink]}>
          <SectionHeader title="Exercise Name" />
          <View style={CommonStyles.padding6}>
            <View style={CommonStyles.inputContainer}>
              <TextInput
                style={CommonStyles.inputs}
                placeholder="Exercise Name"
                value={exerciseName}
                onChangeText={(name) => setexerciseName(name)}
              />
            </View>
          </View>
          <SectionHeader title="Sets" />
          <View style={[CommonStyles.paddingTop6, CommonStyles.alignCenter]}>
            <Text style={[CommonStyles.placeholderText]}>(Press & hold to re-order)</Text>
          </View>
        </View>
        <View style={[CommonStyles.flexGrow, CommonStyles.flexBasis0]}>
          <DraggableConfigList
            flatListData={setsData}
            refresh={refresh}
            setData={setSetsData}
            addItem={addSet}
            removeItem={removeSet}
            renderItem={renderItem}
          />
        </View>
        <View style={[CommonStyles.flexShrink]}>
          <TouchableOpacity
            style={[CommonStyles.buttons, CommonStyles.buttonsPrimary]}
            disabled={buttonDisabled}
            onPress={async () => {
              await saveWorkout();
            }}
          >
            <Text style={[CommonStyles.buttonText, CommonStyles.textLight]}>Save</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
