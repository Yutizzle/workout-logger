import React, { useState } from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  View,
} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';

import { DraggableConfigList, HeaderBackOnly, SectionHeader } from '../components';
import {
  addExercise,
  removeExercise,
  updateExercises,
  updateWorkoutName,
} from '../slices/NewProgramSlice';
import { RootState } from '../store';
import CommonStyles from '../styles/Common';
import { EditWorkoutScreenNavigationProp } from '../types';

export default function EditWorkoutScreen({ navigation, route }: EditWorkoutScreenNavigationProp) {
  const { workoutIndex } = route.params;
  const workoutName = useSelector(
    (state: RootState) => state.newProgramWorkouts.workouts[workoutIndex].label || ''
  );
  const exercises = useSelector(
    (state: RootState) => state.newProgramWorkouts.workouts[workoutIndex].exercises || []
  );
  const dispatch = useDispatch();
  const [uniqueId, setUniqueId] = useState(2);
  const [refresh, toggleRefresh] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const saveWorkout = () => {};

  const addNewExercise = (idx: number) => {
    // disable all buttons
    setButtonDisabled(true);

    // generate unique id
    setUniqueId((prev) => prev + 1);

    // create data for new row
    const index = exercises?.length ?? 0;
    const newData = {
      key: `item-${uniqueId}`,
      index,
      label: `New Exercise #${uniqueId}`,
      sets: [
        {
          key: 'item-0',
          index: 0,
          label: 'Set #1',
        },
      ],
    };

    // update store
    dispatch(addExercise({ workoutIndex, exercise: newData, exerciseIndex: idx }));

    // refresh flatlist
    toggleRefresh((prev) => !prev);

    // enable all buttons
    setButtonDisabled(false);
  };

  const removeNewExercise = (idx: number) => {
    // disable all buttons
    setButtonDisabled(true);

    // must have at least one exercise, cannot remove last exercise
    if (exercises?.length === 1) {
      Alert.alert('Remove Exercise', `Your workout must contain at least one exercise.`, [
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
        'Remove Exercise',
        `Are you sure you want to remove ${exercises[idx].label} from this workout?`,
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
              // remove selected exercise
              dispatch(removeExercise({ workoutIndex, exerciseIndex: idx }));

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
                onChangeText={(name) =>
                  dispatch(updateWorkoutName({ workoutIndex, workoutName: name }))
                }
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
            flatListData={exercises}
            refresh={refresh}
            setData={(data) => {
              dispatch(updateExercises({ workoutIndex, exercises: data }));
            }}
            addItem={addNewExercise}
            removeItem={removeNewExercise}
            goToSettings={(item) => {
              navigation.navigate('EditExerciseScreen', {
                workoutIndex,
                exerciseIndex: item.index,
              });
            }}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
