import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';

import { HeaderBackOnly, SectionHeader } from '../components';
import CommonStyles from '../styles/Common';
import { EditSetScreenNavigationProp } from '../types';

type SetConfig = {
  weight: string;
  reps: string;
  setDuration: string;
  restDuration: string;
  repsIncrFreq: string;
  repsIncrAmount: string;
  maxReps: string;
  weightIncrFreq: string;
  weightIncrAmount: string;
  maxWeight: string;
  setDurationIncrFreq: string;
  setDurationIncrAmount: string;
  maxSetDuration: string;
};

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
            style={CommonStyles.inputs}
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

export default function EditSetScreen({ navigation, route }: EditSetScreenNavigationProp) {
  const { workoutIndex, exerciseIndex } = route.params;
  const workoutName = useSelector(
    (state: RootState) => state.newProgramWorkouts.workouts[workoutIndex].label || ''
  );
  const exerciseData = useSelector(
    (state: RootState) => state.newProgramWorkouts.workouts[workoutIndex].exercises || []
  );
  const initState = {
    weight: '',
    reps: '',
    setDuration: '',
    restDuration: '',
    repsIncrFreq: '',
    repsIncrAmount: '',
    maxReps: '',
    weightIncrFreq: '',
    weightIncrAmount: '',
    maxWeight: '',
    setDurationIncrFreq: '',
    setDurationIncrAmount: '',
    maxSetDuration: '',
  };
  const [setConfig, setSetConfig] = useState<SetConfig>(initState);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[CommonStyles.viewContainer]}
    >
      <View style={CommonStyles.flexNoShrink}>
        <HeaderBackOnly headerTitle={route.params.set.label} />
      </View>
      <TouchableWithoutFeedback
        containerStyle={CommonStyles.flexGrow}
        style={CommonStyles.flexGrow}
        onPress={Keyboard.dismiss}
      >
        <ScrollView style={[CommonStyles.padding10, CommonStyles.flexGrow]}>
          <ConfigInput
            headerTitle="Weight"
            inputValue={setConfig.weight}
            setValue={(val) => {
              setSetConfig((prev) => ({ ...prev, weight: val }));
            }}
          />
          <ConfigInput
            headerTitle="Reps"
            inputValue={setConfig.reps}
            setValue={(val) => {
              setSetConfig((prev) => ({ ...prev, reps: val }));
            }}
          />
          <ConfigInput
            headerTitle="Set Duration"
            inputValue={setConfig.setDuration}
            setValue={(val) => {
              setSetConfig((prev) => ({ ...prev, setDuration: val }));
            }}
          />
          <ConfigInput
            headerTitle="Set Rest Duration"
            inputValue={setConfig.restDuration}
            setValue={(val) => {
              setSetConfig((prev) => ({ ...prev, restDuration: val }));
            }}
          />
          <SectionHeader title="Reps Increment Frequency" />
          <View style={CommonStyles.padding6}>
            <Picker
              style={CommonStyles.flexShrink}
              selectedValue={setConfig.repsIncrFreq}
              onValueChange={(freq) => {
                setSetConfig((prev) => ({ ...prev, repsIncrFreq: freq }));
              }}
            >
              <Picker.Item key="--" label="--" value="" />
            </Picker>
          </View>
          <ConfigInput
            headerTitle="Reps Increment Amount"
            inputValue={setConfig.repsIncrAmount}
            setValue={(val) => {
              setSetConfig((prev) => ({ ...prev, repsIncrAmount: val }));
            }}
          />
          <ConfigInput
            headerTitle="Max Reps Before Reset"
            inputValue={setConfig.maxReps}
            setValue={(val) => {
              setSetConfig((prev) => ({ ...prev, maxReps: val }));
            }}
          />
          <SectionHeader title="Weight Increment Frequency" />
          <View style={CommonStyles.padding6}>
            <Picker
              style={CommonStyles.flexShrink}
              selectedValue={setConfig.weightIncrFreq}
              onValueChange={(freq) => {
                setSetConfig((prev) => ({ ...prev, weightIncrFreq: freq }));
              }}
            >
              <Picker.Item key="--" label="--" value="" />
            </Picker>
          </View>
          <ConfigInput
            headerTitle="Weight Increment Amount"
            inputValue={setConfig.weightIncrAmount}
            setValue={(val) => {
              setSetConfig((prev) => ({ ...prev, weightIncrAmount: val }));
            }}
          />
          <ConfigInput
            headerTitle="Max Weight Before Reset"
            inputValue={setConfig.maxWeight}
            setValue={(val) => {
              setSetConfig((prev) => ({ ...prev, maxWeight: val }));
            }}
          />
          <SectionHeader title="Set Duration Increment Frequency" />
          <View style={CommonStyles.padding6}>
            <Picker
              style={CommonStyles.flexShrink}
              selectedValue={setConfig.setDurationIncrFreq}
              onValueChange={(freq) => {
                setSetConfig((prev) => ({ ...prev, setDurationIncrFreq: freq }));
              }}
            >
              <Picker.Item key="--" label="--" value="" />
            </Picker>
          </View>
          <ConfigInput
            headerTitle="Set Duration Increment Amount"
            inputValue={setConfig.setDurationIncrAmount}
            setValue={(val) => {
              setSetConfig((prev) => ({ ...prev, setDurationIncrAmount: val }));
            }}
          />
          <ConfigInput
            headerTitle="Max Set Duration Before Reset"
            inputValue={setConfig.maxSetDuration}
            setValue={(val) => {
              setSetConfig((prev) => ({ ...prev, maxSetDuration: val }));
            }}
          />
        </ScrollView>
        <View style={[CommonStyles.flexNoShrink]}>
          <TouchableOpacity
            style={[CommonStyles.buttons, CommonStyles.buttonsPrimary]}
            disabled={buttonDisabled}
            onPress={async () => {}}
          >
            <Text style={[CommonStyles.buttonText, CommonStyles.textLight]}>Save</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
