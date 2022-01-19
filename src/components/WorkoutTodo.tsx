import React, { useEffect, useState } from "react";
import { WorkoutExecutionData } from "../common/types";
import { Text, TouchableOpacity, View } from "react-native";
import CommonStyles from '../styles/Common'
import { LinearGradient } from "expo-linear-gradient";
import { TextInput } from "react-native-gesture-handler";
import { MaterialIcons } from '@expo/vector-icons';
import { useInsert } from "react-supabase";
import { useAuth } from "../hooks/useAuth";

const SetTodo =  (props: {data: WorkoutExecutionData, setWorkoutDataHandler: React.Dispatch<React.SetStateAction<WorkoutExecutionData[]>>}) => {
    const session = useAuth();
    const [insertState, insertSet] = useInsert('user_exercise_history');
    const [exerciseData, setExerciseData] = useState<WorkoutExecutionData>(props.data);
    const [userInputData, setUserInputData] = useState({reps: '', weight: '', set_duration: ''});
    const [buttonState, setButtonState] = useState({disabled: false});
    
    useEffect(() => {
        const reps = props.data.reps_completed ?? props.data.reps;
        const weight = props.data.weight_completed ?? props.data.weight;
        const setDuration = props.data.set_duration_completed ?? props.data.set_duration;
        setUserInputData({
            reps: reps ? reps.toString() : '', 
            weight: weight ? weight.toString() : '', 
            set_duration: setDuration ? setDuration.toString() : '' 
        });
        setExerciseData(props.data);
    }, [props.data]);

    const completeSet = async () => {
        setButtonState({disabled: true});
        const repsCompleted = parseInt(userInputData.reps);
        const weightCompleted = parseInt(userInputData.weight);
        const setDurationCompleted = parseInt(userInputData.set_duration);
        if(exerciseData.reps && isNaN(repsCompleted) 
            || exerciseData.weight && isNaN(weightCompleted) 
            || exerciseData.set_duration && isNaN(setDurationCompleted)) {

            console.log('Error: Input is not a valid number!');
            console.log('User Input: ', userInputData);
        } else {
            let data = {
                user_id: session.user?.id,
                workout_id: exerciseData.workout_id,
                exercise: exerciseData.exercise,
                set_completed: exerciseData.set,
                reps_completed: repsCompleted,
                weight: weightCompleted,
                set_duration_completed: setDurationCompleted,
                set_failed: ((exerciseData.reps && repsCompleted < exerciseData.reps) ?? false)
                    || ((exerciseData.weight && weightCompleted < exerciseData.weight) ?? false)
                    || ((exerciseData.set_duration && setDurationCompleted < exerciseData.set_duration) ?? false),
                user_workout_history_id: exerciseData.workout_history_id,
                created_by: session.user?.id
            }
            const set = await insertSet(data);

            if(set.error) {
                console.log('error: ', set.error);
                console.log('Insert Data: ', data);
            } else {
                //update child component SetTodo data
                setExerciseData(prev => {
                    return {
                        ...prev,
                        completed: true,
                        reps_completed: repsCompleted,
                        weight_completed: weightCompleted,
                        set_duration_completed: setDurationCompleted
                    }
                });

                //update parent component WorkoutScreen data
                props.setWorkoutDataHandler(prev => {
                    return prev.map((set) => {
                        if(set.exercise == exerciseData.exercise && set.set == exerciseData.set){
                            return {
                                ...exerciseData,
                                completed: true,
                                reps_completed: repsCompleted,
                                weight_completed: weightCompleted,
                                set_duration_completed: setDurationCompleted
                            }
                        } else {
                            return set;
                        }
                    });
                });
                
            }
        }
        setButtonState({disabled: false});
    }
    
    return(
        <View style={CommonStyles.setTodoContainer}>  
            <TouchableOpacity style={CommonStyles.setTodoGradientContainer} disabled={exerciseData.completed || buttonState.disabled}
                onPress={async () => await completeSet()}>
                <LinearGradient 
                    colors={["#284b63", "#f9f9f9" ,"#fff"]}
                    start={{x: 0, y: 1}}
                    end={{x: 3, y: 1}}
                    style={!exerciseData.completed ? CommonStyles.setTodoGradient : CommonStyles.setTodoGradientCompleted}>
                        <View style={!exerciseData.completed ? CommonStyles.setTodoGradientContent : CommonStyles.setTodoCompleted}>
                            <MaterialIcons name="check" style={exerciseData.completed ? CommonStyles.textLight : {}}></MaterialIcons>
                        </View>
                </LinearGradient>
            </TouchableOpacity>
            {exerciseData.reps ?
                <>
                    <Text style={CommonStyles.setTodoText}>Reps:</Text>
                    <View style={CommonStyles.inputContainer}>
                        <TextInput style={!exerciseData.completed ? CommonStyles.inlineInput : [CommonStyles.inlineInput, CommonStyles.disabled]} 
                            editable={!exerciseData.completed}
                            maxLength={2}
                            onChangeText={(reps) => {setUserInputData({...userInputData, reps: reps.replace(/[^0-9]/g, '')});}}
                            value={userInputData.reps}
                            keyboardType="numeric">
                        </TextInput>
                    </View> 
                </> : 
                <></>
            }
            {exerciseData.weight ?
                <>
                    <Text style={CommonStyles.setTodoText}>Weight:</Text>
                    <View style={CommonStyles.inputContainer}>
                        <TextInput style={!exerciseData.completed ? CommonStyles.inlineInput : [CommonStyles.inlineInput, CommonStyles.disabled]}
                            editable={!exerciseData.completed}
                            onChangeText={(weight) => {setUserInputData({...userInputData, weight: weight.replace(/[^0-9]/g, '')});}}
                            value={userInputData.weight}
                            keyboardType="numeric">
                            </TextInput>
                    </View>
                    <Text style={CommonStyles.setTodoText}>lbs</Text>
                </> :
                <></>
            }     
            {exerciseData.set_duration ? 
                <>
                    <Text style={CommonStyles.setTodoText}>Set Duration:</Text> 
                    <View style={CommonStyles.inputContainer}> 
                        <TextInput style={!exerciseData.completed ? CommonStyles.inlineInput : [CommonStyles.inlineInput, CommonStyles.disabled]}
                                editable={!exerciseData.completed}
                                onChangeText={(duration) => {setUserInputData({...userInputData, set_duration: duration.replace(/[^0-9]/g, '')});}}
                                value={userInputData.set_duration}
                                keyboardType="numeric"/>
                    </View>
                    <Text style={CommonStyles.setTodoText}>secs</Text>
                </> :
                <></>}
        </View>
    );
}

export const WorkoutTodo = (props: {data: WorkoutExecutionData[], setWorkoutDataHandler: React.Dispatch<React.SetStateAction<WorkoutExecutionData[]>>}) => {
    let prevExercise = '';
    const todo = props.data.map((set, index) => {
        if(set.exercise != prevExercise) {
            prevExercise = set.exercise;
            return (
                <React.Fragment key={index}>
                    <Text key={`${set.exercise}`} style={CommonStyles.todoTextHead}>
                        {set.exercise}
                    </Text>
                    <LinearGradient 
                        colors={["#284b63", "#fff"]}
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 0}}
                        style={CommonStyles.dividerGradient}
                    />
                    <SetTodo key={`${set.exercise}-${set.set}`} data={set} setWorkoutDataHandler={props.setWorkoutDataHandler}></SetTodo>
                </React.Fragment>
            );
        } else {
            return (
                <SetTodo key={`${set.exercise}-${set.set}`} data={set} setWorkoutDataHandler={props.setWorkoutDataHandler}></SetTodo>
            );
        }
    });

    return (<>{todo}</>);
}