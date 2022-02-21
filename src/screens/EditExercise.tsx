import { Entypo, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
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
import { RenderItemParams, ScaleDecorator } from 'react-native-draggable-flatlist';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';

import { DraggableConfigList, HeaderBackOnly, SectionHeader } from '../components';
import { addSet, removeSet, updateExerciseName, updateSets } from '../slices/NewProgramSlice';
import { RootState } from '../store';
import CommonStyles from '../styles/Common';
import { EditExerciseScreenNavigationProp, NewProgramSets } from '../types';

export default function EditExerciseScreen({
  navigation,
  route,
}: EditExerciseScreenNavigationProp) {
  const { workoutIndex, exerciseIndex } = route.params;
  const workout = useSelector(
    (state: RootState) => state.newProgramWorkouts.workouts[workoutIndex]
  );
  const exercises = workout.exercises ?? [];
  const selectedExercise = exercises[exerciseIndex] ?? [];
  const exerciseName = selectedExercise.label;
  const exerciseSets = selectedExercise.sets ?? [];
  const dispatch = useDispatch();
  const [uniqueId, setUniqueId] = useState(2);
  const [refresh, toggleRefresh] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const saveWorkout = () => {};

  const addNewSet = (idx: number) => {
    //disable all buttons
    setButtonDisabled(true);

    // generate unique id
    setUniqueId((prev) => prev + 1);

    // create data for new row
    const index = exerciseSets.length;
    const newData = {
      key: `item-${uniqueId}`,
      index,
      label: `Set #${uniqueId}`,
    };

    // update store
    dispatch(addSet({ workoutIndex, exerciseIndex, setIndex: idx, set: newData }));

    // refresh flatlist
    toggleRefresh((prev) => !prev);

    //enable all buttons
    setButtonDisabled(false);
  };

  const removeNewSet = (idx: number) => {
    // disable all buttons
    setButtonDisabled(true);

    // must have at least one set, cannot remove last set
    if (exerciseSets.length === 1) {
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
        `Are you sure you want to remove ${exerciseSets[idx].label} from this workout?`,
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
              // update store
              dispatch(removeSet({ workoutIndex, exerciseIndex, setIndex: idx }));

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

  const renderItem = ({ item, drag, isActive }: RenderItemParams<NewProgramSets>) => (
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
              navigation.navigate('EditSetScreen', {
                workoutIndex,
                exerciseIndex,
                setIndex: item.index,
              });
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
              addNewSet(item.index);
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
              removeNewSet(item.index);
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
                onChangeText={(name) =>
                  dispatch(updateExerciseName({ workoutIndex, exerciseIndex, exerciseName: name }))
                }
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
            flatListData={exerciseSets}
            refresh={refresh}
            setData={(data) => {
              dispatch(updateSets({ workoutIndex, exerciseIndex, sets: data }));
            }}
            addItem={() => {}}
            removeItem={() => {}}
            renderItem={renderItem}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
