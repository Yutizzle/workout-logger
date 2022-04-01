import { Picker } from '@react-native-picker/picker';
import React, { useCallback, useEffect, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, TextInput, View } from 'react-native';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

import { getAllIncrementFreq } from '../api/programs';
import { HeaderBackOnly, SectionHeader } from '../components';
import { updateSelectedSet } from '../slices/NewProgramSlice';
import { RootState } from '../store';
import CommonStyles from '../styles/Common';
import { EditSetScreenNavigationProp, IncrFrequency } from '../types';

type InputProps = {
  headerTitle: string;
  inputValue: string;
  setValue: (val: string) => void;
};

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
  const [incrFreqList, setIncrFreqList] = useState<IncrFrequency[]>();
  const workout = useSelector(
    (state: RootState) => state.newProgramWorkouts.workouts[workoutIndex]
  );
  const exercise = useSelector(
    (state: RootState) => state.newProgramWorkouts.exercises[exerciseIndex]
  );
  const selectedSet = useSelector((state: RootState) => state.newProgramWorkouts.sets[setIndex]);
  const dispatch = useDispatch();

  const getIncrementFreq = useCallback(async () => {
    const frequencies = await getAllIncrementFreq();
    setIncrFreqList(frequencies);
  }, []);

  useEffect(() => {
    getIncrementFreq();
  }, [getIncrementFreq]);

  return (
    <SafeAreaView style={[CommonStyles.flex, CommonStyles.backgroundColor, CommonStyles.padding10]}>
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
                    workoutId: workout.key,
                    exerciseId: exercise.key,
                    setId: selectedSet.key,
                    prop: {
                      weight: val.replace(/[^0-9]/g, ''),
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
                    workoutId: workout.key,
                    exerciseId: exercise.key,
                    setId: selectedSet.key,
                    prop: {
                      reps: val.replace(/[^0-9]/g, ''),
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
                    workoutId: workout.key,
                    exerciseId: exercise.key,
                    setId: selectedSet.key,
                    prop: {
                      setDuration: val.replace(/[^0-9]/g, ''),
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
                    workoutId: workout.key,
                    exerciseId: exercise.key,
                    setId: selectedSet.key,
                    prop: {
                      restDuration: val.replace(/[^0-9]/g, ''),
                    },
                  })
                );
              }}
            />
            <SectionHeader title="Reps Increment Frequency" />
            <View style={CommonStyles.padding6}>
              <Picker
                style={CommonStyles.flexShrink}
                selectedValue={selectedSet.repsIncrFreq}
                onValueChange={(freq) => {
                  dispatch(
                    updateSelectedSet({
                      workoutId: workout.key,
                      exerciseId: exercise.key,
                      setId: selectedSet.key,
                      prop: {
                        repsIncrFreq: freq,
                      },
                    })
                  );
                }}
              >
                <Picker.Item key="--" label="--" value="" />
                {incrFreqList?.map((freq) => (
                  <Picker.Item key={freq.id} label={freq.frequency} value={freq.id} />
                ))}
              </Picker>
            </View>
            <ConfigInput
              headerTitle="Reps Increment Amount"
              inputValue={selectedSet.repsIncrAmount ?? ''}
              setValue={(val) => {
                dispatch(
                  updateSelectedSet({
                    workoutId: workout.key,
                    exerciseId: exercise.key,
                    setId: selectedSet.key,
                    prop: {
                      repsIncrAmount: val.replace(/[^0-9]/g, ''),
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
                    workoutId: workout.key,
                    exerciseId: exercise.key,
                    setId: selectedSet.key,
                    prop: {
                      maxReps: val.replace(/[^0-9]/g, ''),
                    },
                  })
                );
              }}
            />
            <SectionHeader title="Weight Increment Frequency" />
            <View style={CommonStyles.padding6}>
              <Picker
                style={CommonStyles.flexShrink}
                selectedValue={selectedSet.weightIncrFreq}
                onValueChange={(freq) => {
                  dispatch(
                    updateSelectedSet({
                      workoutId: workout.key,
                      exerciseId: exercise.key,
                      setId: selectedSet.key,
                      prop: {
                        weightIncrFreq: freq,
                      },
                    })
                  );
                }}
              >
                <Picker.Item key="--" label="--" value="" />
                {incrFreqList?.map((freq) => (
                  <Picker.Item key={freq.id} label={freq.frequency} value={freq.id} />
                ))}
              </Picker>
            </View>
            <ConfigInput
              headerTitle="Weight Increment Amount"
              inputValue={selectedSet.weightIncrAmount ?? ''}
              setValue={(val) => {
                dispatch(
                  updateSelectedSet({
                    workoutId: workout.key,
                    exerciseId: exercise.key,
                    setId: selectedSet.key,
                    prop: {
                      weightIncrAmount: val.replace(/[^0-9]/g, ''),
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
                    workoutId: workout.key,
                    exerciseId: exercise.key,
                    setId: selectedSet.key,
                    prop: {
                      maxWeight: val.replace(/[^0-9]/g, ''),
                    },
                  })
                );
              }}
            />
            <SectionHeader title="Set Duration Increment Frequency" />
            <View style={CommonStyles.padding6}>
              <Picker
                style={CommonStyles.flexShrink}
                selectedValue={selectedSet.setDurationIncrFreq}
                onValueChange={(freq) => {
                  dispatch(
                    updateSelectedSet({
                      workoutId: workout.key,
                      exerciseId: exercise.key,
                      setId: selectedSet.key,
                      prop: {
                        setDurationIncrFreq: freq,
                      },
                    })
                  );
                }}
              >
                <Picker.Item key="--" label="--" value="" />
                {incrFreqList?.map((freq) => (
                  <Picker.Item key={freq.id} label={freq.frequency} value={freq.id} />
                ))}
              </Picker>
            </View>
            <ConfigInput
              headerTitle="Set Duration Increment Amount"
              inputValue={selectedSet.setDurationIncrAmount ?? ''}
              setValue={(val) => {
                dispatch(
                  updateSelectedSet({
                    workoutId: workout.key,
                    exerciseId: exercise.key,
                    setId: selectedSet.key,
                    prop: {
                      setDurationIncrAmount: val.replace(/[^0-9]/g, ''),
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
                    workoutId: workout.key,
                    exerciseId: exercise.key,
                    setId: selectedSet.key,
                    prop: {
                      maxSetDuration: val.replace(/[^0-9]/g, ''),
                    },
                  })
                );
              }}
            />
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
