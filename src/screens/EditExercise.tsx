import { Entypo, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
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
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

import { DraggableConfigList, HeaderBackOnly, SectionHeader } from '../components';
import { addSet, removeSet, updateExerciseName, updateSets } from '../slices/NewProgramSlice';
import { RootState } from '../store';
import CommonStyles from '../styles/Common';
import { EditExerciseScreenNavigationProp, RenderItem } from '../types';

export default function EditExerciseScreen({
  navigation,
  route,
}: EditExerciseScreenNavigationProp) {
  const { workoutIndex, exerciseIndex } = route.params;
  const workout = useSelector(
    (state: RootState) => state.newProgramWorkouts.workouts[workoutIndex]
  );
  const exercise = useSelector(
    (state: RootState) => state.newProgramWorkouts.exercises[exerciseIndex]
  );
  const sets = useSelector((state: RootState) =>
    state.newProgramWorkouts.sets.filter(
      (item) => item.workoutId === workout.key && item.exerciseId === exercise.key
    )
  );
  const allSets = useSelector((state: RootState) => state.newProgramWorkouts.sets);
  const dispatch = useDispatch();
  const [refresh, toggleRefresh] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  // const saveWorkout = () => {};

  const addNewSet = () => {
    // disable all buttons
    setButtonDisabled(true);

    // update store
    dispatch(addSet({ workoutId: workout.key, exerciseId: exercise.key }));

    // refresh flatlist
    toggleRefresh((prev) => !prev);

    // enable all buttons
    setButtonDisabled(false);
  };

  const removeNewSet = (idx: number) => {
    // disable all buttons
    setButtonDisabled(true);

    // must have at least one set, cannot remove last set
    if (sets.length === 1) {
      Alert.alert('Remove Set', `Your exercise must contain at least one set.`, [
        {
          text: 'OK',
          onPress: () => {
            setButtonDisabled(false);
          },
        },
      ]);
    } else {
      Alert.alert(
        'Remove Set',
        `Are you sure you want to remove ${sets[idx].label} from this exercise?`,
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
              dispatch(
                removeSet({ workoutId: workout.key, exerciseId: exercise.key, setIndex: idx })
              );

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

  const renderItem = ({ item }: RenderItemParams<RenderItem>) => (
    <ScaleDecorator>
      <TouchableOpacity
        disabled
        style={[
          CommonStyles.flexDirectionRow,
          CommonStyles.alignCenter,
          CommonStyles.justifyCenter,
          CommonStyles.alignCenter,
          CommonStyles.padding10,
          CommonStyles.flatListItem,
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
                setIndex: allSets.findIndex(
                  (s) =>
                    s.workoutId === workout.key &&
                    s.exerciseId === exercise.key &&
                    s.key === item.key
                ),
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
              addNewSet();
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
    <SafeAreaView style={[CommonStyles.flex, CommonStyles.backgroundColor, CommonStyles.padding10]}>
      <StatusBar />
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
                  style={[CommonStyles.inputs, CommonStyles.flex]}
                  placeholder="Exercise Name"
                  value={exercise.label}
                  onChangeText={(name) =>
                    dispatch(
                      updateExerciseName({
                        workoutId: workout.key,
                        exerciseId: exercise.key,
                        exerciseName: name,
                      })
                    )
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
              flatListData={sets}
              refresh={refresh}
              setData={(data) => {
                dispatch(
                  updateSets({ workoutId: workout.key, exerciseId: exercise.key, sets: data })
                );
              }}
              addItem={() => {}}
              removeItem={() => {}}
              renderItem={renderItem}
            />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
