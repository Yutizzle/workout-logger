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
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import { DraggableConfigList, HeaderBackOnly, SectionHeader } from '../components';
import CommonStyles from '../styles/Common';
import { EditWorkoutScreenNavigationProp } from '../types';

type Item = {
  key: string;
  index: number;
  label: string;
};

export default function EditWorkoutScreen({ navigation, route }: EditWorkoutScreenNavigationProp) {
  const [exerciseData, setExerciseData] = useState<Item[]>([]);
  const [workoutName, setWorkoutName] = useState('');
  const [uniqueId, setUniqueId] = useState(2);
  const [refresh, toggleRefresh] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  useEffect(() => {
    const initialData: Item[] = [...Array(1)].map((_, index) => ({
      key: `item-${index}`,
      index,
      label: `New Exercise #${index + 1}`,
    }));
    setExerciseData(initialData);
  }, [navigation]);

  const saveWorkout = () => {};

  const addExercise = (idx: number) => {
    setButtonDisabled(true);
    setUniqueId((prev) => prev + 1);
    setExerciseData((prev) => {
      // create data for new row
      const index = prev.length;
      const newData: Item = {
        key: `item-${uniqueId}`,
        index,
        label: `New Exercise #${uniqueId}`,
      };

      // insert after row
      prev.splice(idx + 1, 0, newData);

      // update all indexes
      return prev.map((data, i) => ({ ...data, index: i }));
    });
    toggleRefresh((prev) => !prev);
    setButtonDisabled(false);
  };

  const removeExercise = (idx: number) => {
    setButtonDisabled(true);
    if (exerciseData.length === 1) {
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
        `Are you sure you want to remove ${exerciseData[idx].label} from this workout?`,
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
              setExerciseData((prev) => {
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

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[CommonStyles.viewContainer]}
    >
      <View style={CommonStyles.flexShrink}>
        <HeaderBackOnly headerTitle="Edit Workout" />
      </View>
      <TouchableWithoutFeedback
        containerStyle={CommonStyles.flexGrow}
        style={CommonStyles.flexGrow}
        onPress={Keyboard.dismiss}
      >
        <View style={[CommonStyles.padding10, CommonStyles.flexShrink]}>
          <SectionHeader title="Workout Name" />
          <View style={CommonStyles.padding6}>
            <View style={CommonStyles.inputContainer}>
              <TextInput
                style={CommonStyles.inputs}
                placeholder="Workout Name"
                value={workoutName}
                onChangeText={(name) => setWorkoutName(name)}
              />
            </View>
          </View>
          <SectionHeader title="Exercises" />
          <View style={[CommonStyles.paddingTop6, CommonStyles.alignCenter]}>
            <Text style={[CommonStyles.placeholderText]}>(Press & hold to re-order)</Text>
          </View>
        </View>
        <View style={[CommonStyles.flexGrow, CommonStyles.flexBasis0]}>
          <DraggableConfigList
            flatListData={exerciseData}
            refresh={refresh}
            setData={setExerciseData}
            addItem={addExercise}
            removeItem={removeExercise}
            goToSettings={() => navigation.navigate('EditExerciseScreen')}
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
