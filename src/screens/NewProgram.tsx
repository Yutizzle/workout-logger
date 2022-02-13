import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
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
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import { HeaderBackOnly, SectionHeader } from '../components';
import CommonStyles from '../styles/Common';
import { NewProgramsScreenNavigationProp } from '../types';

type Item = {
  key: string;
  index: number;
  label: string;
};

export default function NewProgramScreen({ navigation }: NewProgramsScreenNavigationProp) {
  const [workoutData, setWorkoutData] = useState<Item[]>([]);
  const [programName, setProgramName] = useState('');
  const [uniqueId, setUniqueId] = useState(2);
  const [refresh, toggleRefresh] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  useEffect(() => {
    const initialData: Item[] = [...Array(1)].map((_, index) => ({
      key: `item-${index}`,
      index,
      label: `New Workout #${index + 1}`,
    }));
    setWorkoutData(initialData);
  }, [navigation]);

  const createNewProgram = () => {};

  const addWorkout = (idx: number) => {
    setButtonDisabled(true);
    setUniqueId((prev) => prev + 1);
    setWorkoutData((prev) => {
      // create data for new row
      const index = prev.length;
      const newData: Item = {
        key: `item-${uniqueId}`,
        index,
        label: `New Workout #${uniqueId}`,
      };

      // insert after row
      prev.splice(idx + 1, 0, newData);

      // update all indexes
      return prev.map((data, i) => ({ ...data, index: i }));
    });
    toggleRefresh((prev) => !prev);
    setButtonDisabled(false);
  };

  const removeWorkout = (idx: number) => {
    setButtonDisabled(true);
    if (workoutData.length === 1) {
      Alert.alert('Remove Workout', `Your program must contain at least one workout.`, [
        {
          text: 'OK',
          onPress: () => {
            setButtonDisabled(false);
          },
        },
      ]);
    } else {
      Alert.alert(
        'Remove Workout',
        `Are you sure you want to remove ${workoutData[idx].label} from this program?`,
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
              setWorkoutData((prev) => {
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
          CommonStyles.padding10,
          CommonStyles.flatListItem,
          {
            backgroundColor: isActive ? '#ffdf64' : '#f9f9f9',
          },
        ]}
      >
        <View style={[CommonStyles.flexDirectionRow, CommonStyles.flexGrow]}>
          <MaterialCommunityIcons name="drag-vertical" size={26} />
          <Text style={[CommonStyles.todoTextHead]}>{item.label}</Text>
        </View>

        <View style={[CommonStyles.flexDirectionRow, CommonStyles.flexShrink]}>
          <View style={CommonStyles.padding6}>
            <TouchableOpacity disabled={buttonDisabled} onPress={() => {}}>
              <MaterialCommunityIcons name="pencil" size={26} style={CommonStyles.textDark} />
            </TouchableOpacity>
          </View>
          <View style={CommonStyles.padding6}>
            <TouchableOpacity
              style={[CommonStyles.inlineButtons, CommonStyles.buttonsPrimary]}
              disabled={buttonDisabled}
              onPress={() => {
                addWorkout(item.index);
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
                removeWorkout(item.index);
              }}
            >
              <Entypo name="cross" size={26} style={CommonStyles.textLight} />
            </TouchableOpacity>
          </View>
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
        <HeaderBackOnly headerTitle="Create New Program" />
      </View>
      <TouchableWithoutFeedback
        containerStyle={CommonStyles.flexGrow}
        style={CommonStyles.flexGrow}
        onPress={Keyboard.dismiss}
      >
        <View style={[CommonStyles.padding10, CommonStyles.flexShrink]}>
          <SectionHeader title="Program Name" />
          <View style={CommonStyles.padding6}>
            <View style={CommonStyles.inputContainer}>
              <TextInput
                style={CommonStyles.inputs}
                placeholder="Program Name"
                value={programName}
                onChangeText={(name) => setProgramName(name)}
              />
            </View>
          </View>
          <SectionHeader title="Workouts" />
          <View style={[CommonStyles.paddingTop6, CommonStyles.alignCenter]}>
            <Text style={[CommonStyles.placeholderText]}>(Press & hold to re-order)</Text>
          </View>
        </View>
        <View style={[CommonStyles.flexGrow, CommonStyles.flexBasis0]}>
          <DraggableFlatList
            data={workoutData}
            extraData={refresh}
            onDragEnd={({ data }) => setWorkoutData(data)}
            keyExtractor={(item) => item.key}
            renderItem={renderItem}
            containerStyle={[CommonStyles.paddingLefRight10]}
          />
        </View>
        <View style={[CommonStyles.flexShrink]}>
          <TouchableOpacity
            style={[CommonStyles.buttons, CommonStyles.buttonsPrimary]}
            disabled={buttonDisabled}
            onPress={async () => {
              await createNewProgram();
            }}
          >
            <Text style={[CommonStyles.buttonText, CommonStyles.textLight]}>Create</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
