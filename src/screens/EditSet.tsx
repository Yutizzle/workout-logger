import { Picker } from '@react-native-picker/picker';
import React from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, TextInput, View } from 'react-native';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { useSelect } from 'react-supabase';

import { HeaderBackOnly, SectionHeader } from '../components';
import { updateSelectedSet } from '../slices/NewProgramSlice';
import { RootState } from '../store';
import CommonStyles from '../styles/Common';
import { EditSetScreenNavigationProp } from '../types';

type InputProps = {
  headerTitle: string;
  inputValue: string;
  setValue: (val: string) => void;
};

interface IncrFrequency {
  frequency: string;
}

function ConfigInput({ headerTitle, inputValue, setValue }: InputProps) {
  return (
    <>
      <SectionHeader title={headerTitle} />
      <View style={CommonStyles.padding6}>
        <View style={CommonStyles.inputContainer}>
          <TextInput
            style={[CommonStyles.inputs, CommonStyles.flex]}
            placeholder={headerTitle}
            keyboardType="numeric"
            value={inputValue}
            onChangeText={(val) => {
              setValue(val);
            }}
          />
        </View>
      </View>
    </>
  );
}

export default function EditSetScreen({ route }: EditSetScreenNavigationProp) {
  const { workoutIndex, exerciseIndex, setIndex } = route.params;
  const workout = useSelector(
    (state: RootState) => state.newProgramWorkouts.workouts[workoutIndex]
  );
  const exercises = workout.exercises ?? [];
  const selectedExercise = exercises[exerciseIndex] ?? [];
  const exerciseSets = selectedExercise.sets ?? [];
  const selectedSet = exerciseSets[setIndex];
  const dispatch = useDispatch();
  const [incrFreqList] = useSelect<IncrFrequency>('increment_frequency', { columns: 'frequency' });
  console.log(incrFreqList);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[CommonStyles.viewContainer]}
    >
      <View style={CommonStyles.flexNoShrink}>
        <HeaderBackOnly headerTitle={selectedSet.label} />
      </View>
      <TouchableWithoutFeedback
        containerStyle={CommonStyles.flexGrow}
        style={CommonStyles.flexGrow}
        onPress={Keyboard.dismiss}
      >
        <ScrollView style={[CommonStyles.padding10, CommonStyles.flexGrow]}>
          <ConfigInput
            headerTitle="Weight"
            inputValue={selectedSet.weight ?? ''}
            setValue={(val) => {
              dispatch(
                updateSelectedSet({
                  workoutIndex,
                  exerciseIndex,
                  setIndex,
                  prop: {
                    key: selectedSet.key,
                    index: selectedSet.index,
                    label: selectedSet.label,
                    weight: val,
                  },
                })
              );
            }}
          />
          <ConfigInput
            headerTitle="Reps"
            inputValue={selectedSet.reps ?? ''}
            setValue={(val) => {
              dispatch(
                updateSelectedSet({
                  workoutIndex,
                  exerciseIndex,
                  setIndex,
                  prop: {
                    key: selectedSet.key,
                    index: selectedSet.index,
                    label: selectedSet.label,
                    reps: val,
                  },
                })
              );
            }}
          />
          <ConfigInput
            headerTitle="Set Duration"
            inputValue={selectedSet.setDuration ?? ''}
            setValue={(val) => {
              dispatch(
                updateSelectedSet({
                  workoutIndex,
                  exerciseIndex,
                  setIndex,
                  prop: {
                    key: selectedSet.key,
                    index: selectedSet.index,
                    label: selectedSet.label,
                    setDuration: val,
                  },
                })
              );
            }}
          />
          <ConfigInput
            headerTitle="Set Rest Duration"
            inputValue={selectedSet.restDuration ?? ''}
            setValue={(val) => {
              dispatch(
                updateSelectedSet({
                  workoutIndex,
                  exerciseIndex,
                  setIndex,
                  prop: {
                    key: selectedSet.key,
                    index: selectedSet.index,
                    label: selectedSet.label,
                    restDuration: val,
                  },
                })
              );
            }}
          />
          <SectionHeader title="Reps Increment Frequency" />
          <View style={CommonStyles.padding6}>
            <Picker
              style={CommonStyles.flexShrink}
              selectedValue={selectedSet.repsIncrFreq ?? ''}
              onValueChange={(freq) => {
                dispatch(
                  updateSelectedSet({
                    workoutIndex,
                    exerciseIndex,
                    setIndex,
                    prop: {
                      key: selectedSet.key,
                      index: selectedSet.index,
                      label: selectedSet.label,
                      repsIncrFreq: freq,
                    },
                  })
                );
              }}
            >
              <Picker.Item key="--" label="--" value="" />
              {incrFreqList.data?.map((freq) => (
                <Picker.Item key={freq.frequency} label={freq.frequency} value={freq.frequency} />
              ))}
            </Picker>
          </View>
          <ConfigInput
            headerTitle="Reps Increment Amount"
            inputValue={selectedSet.repsIncrAmount ?? ''}
            setValue={(val) => {
              dispatch(
                updateSelectedSet({
                  workoutIndex,
                  exerciseIndex,
                  setIndex,
                  prop: {
                    key: selectedSet.key,
                    index: selectedSet.index,
                    label: selectedSet.label,
                    repsIncrAmount: val,
                  },
                })
              );
            }}
          />
          <ConfigInput
            headerTitle="Max Reps Before Reset"
            inputValue={selectedSet.maxReps ?? ''}
            setValue={(val) => {
              dispatch(
                updateSelectedSet({
                  workoutIndex,
                  exerciseIndex,
                  setIndex,
                  prop: {
                    key: selectedSet.key,
                    index: selectedSet.index,
                    label: selectedSet.label,
                    maxReps: val,
                  },
                })
              );
            }}
          />
          <SectionHeader title="Weight Increment Frequency" />
          <View style={CommonStyles.padding6}>
            <Picker
              style={CommonStyles.flexShrink}
              selectedValue={selectedSet.weightIncrFreq ?? ''}
              onValueChange={(freq) => {
                dispatch(
                  updateSelectedSet({
                    workoutIndex,
                    exerciseIndex,
                    setIndex,
                    prop: {
                      key: selectedSet.key,
                      index: selectedSet.index,
                      label: selectedSet.label,
                      weightIncrFreq: freq,
                    },
                  })
                );
              }}
            >
              <Picker.Item key="--" label="--" value="" />
              {incrFreqList.data?.map((freq) => (
                <Picker.Item key={freq.frequency} label={freq.frequency} value={freq.frequency} />
              ))}
            </Picker>
          </View>
          <ConfigInput
            headerTitle="Weight Increment Amount"
            inputValue={selectedSet.weightIncrAmount ?? ''}
            setValue={(val) => {
              dispatch(
                updateSelectedSet({
                  workoutIndex,
                  exerciseIndex,
                  setIndex,
                  prop: {
                    key: selectedSet.key,
                    index: selectedSet.index,
                    label: selectedSet.label,
                    weightIncrAmount: val,
                  },
                })
              );
            }}
          />
          <ConfigInput
            headerTitle="Max Weight Before Reset"
            inputValue={selectedSet.maxWeight ?? ''}
            setValue={(val) => {
              dispatch(
                updateSelectedSet({
                  workoutIndex,
                  exerciseIndex,
                  setIndex,
                  prop: {
                    key: selectedSet.key,
                    index: selectedSet.index,
                    label: selectedSet.label,
                    maxWeight: val,
                  },
                })
              );
            }}
          />
          <SectionHeader title="Set Duration Increment Frequency" />
          <View style={CommonStyles.padding6}>
            <Picker
              style={CommonStyles.flexShrink}
              selectedValue={selectedSet.setDurationIncrFreq ?? ''}
              onValueChange={(freq) => {
                dispatch(
                  updateSelectedSet({
                    workoutIndex,
                    exerciseIndex,
                    setIndex,
                    prop: {
                      key: selectedSet.key,
                      index: selectedSet.index,
                      label: selectedSet.label,
                      setDurationIncrFreq: freq,
                    },
                  })
                );
              }}
            >
              <Picker.Item key="--" label="--" value="" />
              {incrFreqList.data?.map((freq) => (
                <Picker.Item key={freq.frequency} label={freq.frequency} value={freq.frequency} />
              ))}
            </Picker>
          </View>
          <ConfigInput
            headerTitle="Set Duration Increment Amount"
            inputValue={selectedSet.setDurationIncrAmount ?? ''}
            setValue={(val) => {
              dispatch(
                updateSelectedSet({
                  workoutIndex,
                  exerciseIndex,
                  setIndex,
                  prop: {
                    key: selectedSet.key,
                    index: selectedSet.index,
                    label: selectedSet.label,
                    setDurationIncrAmount: val,
                  },
                })
              );
            }}
          />
          <ConfigInput
            headerTitle="Max Set Duration Before Reset"
            inputValue={selectedSet.maxSetDuration ?? ''}
            setValue={(val) => {
              dispatch(
                updateSelectedSet({
                  workoutIndex,
                  exerciseIndex,
                  setIndex,
                  prop: {
                    key: selectedSet.key,
                    index: selectedSet.index,
                    label: selectedSet.label,
                    maxSetDuration: val,
                  },
                })
              );
            }}
          />
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
