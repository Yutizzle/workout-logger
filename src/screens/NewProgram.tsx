import React, { useState } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';

import { DraggableConfigList, HeaderBackOnly, SectionHeader } from '../components';
import {
  addWorkout,
  removeWorkout,
  resetWorkouts,
  updateWorkouts,
} from '../slices/NewProgramSlice';
import { RootState } from '../store';
import CommonStyles from '../styles/Common';
import { NewProgramScreenNavigationProp, NewProgramWorkouts } from '../types';

export default function NewProgramScreen({ navigation }: NewProgramScreenNavigationProp) {
  const workouts = useSelector((state: RootState) => state.newProgramWorkouts.workouts);
  const dispatch = useDispatch();
  const [programName, setProgramName] = useState('');
  const [uniqueId, setUniqueId] = useState(2);
  const [refresh, toggleRefresh] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const createNewProgram = () => {};

  const addNewWorkout = (idx: number) => {
    // disable buttons
    setButtonDisabled(true);

    // generate unique id
    setUniqueId((prev) => prev + 1);

    // create data for new row
    const index = workouts.length;
    const newData: NewProgramWorkouts = {
      key: `item-${uniqueId}`,
      index,
      label: `New Workout #${uniqueId}`,
      exercises: [
        {
          key: 'item-0',
          index: 0,
          label: `New Exercise #1`,
          sets: [
            {
              key: 'item-0',
              index: 0,
              label: `New Set #1`,
            },
          ],
        },
      ],
    };

    // update store
    dispatch(addWorkout({ workout: newData, workoutIndex: idx }));

    // refresh grid
    toggleRefresh((prev) => !prev);

    // enable buttons
    setButtonDisabled(false);
  };

  const removeNewWorkout = (idx: number) => {
    // disable all buttons
    setButtonDisabled(true);

    // must have at least one workout, cannot remove last workout
    if (workouts.length === 1) {
      Alert.alert('Remove Workout', `Your program must contain at least one workout.`, [
        {
          text: 'OK',
          onPress: () => {
            // enable all buttons
            setButtonDisabled(false);
          },
        },
      ]);
    } else {
      Alert.alert(
        'Remove Workout',
        `Are you sure you want to remove ${workouts[idx].label} from this program?`,
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
              // remove selected workout
              dispatch(removeWorkout(idx));

              // refresh flatlist
              toggleRefresh((prev) => !prev);

              // enable all buttons
              setButtonDisabled(false);
            },
          },
        ]
      );
    }
  };

  const onGoBack = () => {
    Alert.alert(
      'Leave New Program',
      `Are you sure you want to leave without saving this program?`,
      [
        {
          text: 'Cancel',
          onPress: () => {
            // enable all buttons
            setButtonDisabled(false);
          },
        },
        {
          text: 'Leave',
          style: 'destructive',
          onPress: () => {
            dispatch(resetWorkouts());
            navigation.navigate('ProgramsScreen');
          },
        },
      ]
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[CommonStyles.viewContainer]}
    >
      <View style={CommonStyles.flexShrink}>
        <HeaderBackOnly headerTitle="Create New Program" onGoBack={onGoBack} />
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
          <DraggableConfigList
            flatListData={workouts}
            refresh={refresh}
            setData={(data) => {
              dispatch(updateWorkouts(data));
            }}
            addItem={addNewWorkout}
            removeItem={removeNewWorkout}
            goToSettings={(item) => {
              navigation.navigate('EditWorkoutScreen', {
                workoutIndex: item.index,
              });
            }}
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
