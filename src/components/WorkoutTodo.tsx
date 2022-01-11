import React from "react";
import { WorkoutExecutionData } from "../common/types";
import { Text, TouchableOpacity, View } from "react-native";
import CommonStyles from '../styles/Common'
import { LinearGradient } from "expo-linear-gradient";

const SetTodo =  (props: {data: WorkoutExecutionData, index: number}) => {
    return(
        <View style={CommonStyles.setTodoContainer}>  
            <TouchableOpacity style={CommonStyles.setTodoGradientContainer}>
                <LinearGradient 
                    colors={["#284b63", "#f9f9f9" ,"#fff"]}
                    start={{x: 0, y: 1}}
                    end={{x: 3, y: 1}}
                    style={CommonStyles.setTodoGradient}
                >
                    <View style={CommonStyles.setTodoGradientContent}>
                        <Text style={CommonStyles.setTodoGradientText}>{props.data.reps}</Text>
                    </View>
                </LinearGradient>
            </TouchableOpacity>
            <Text style={CommonStyles.setTodoText}>Set: {props.data.set}</Text>
            <Text style={CommonStyles.setTodoText}>Reps: {props.data.reps}</Text>
            <Text style={CommonStyles.setTodoText}>Weight: {props.data.weight} lbs</Text>
            {props.data.set_duration != null ? <Text>Set Duration: {props.data.set_duration} secs</Text> : <></>}
        </View>
    );
}

export const WorkoutTodo = (props: {data: WorkoutExecutionData[]}) => {
    //console.log(props.data)
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
                    <SetTodo key={`${set.exercise}-${set.set}`} data={set} index={index}></SetTodo>
                </React.Fragment>
            );
        } else {
            return (
                <SetTodo key={`${set.exercise}-${set.set}`} data={set} index={index}></SetTodo>
            );
        }
    });

    return (<>{todo}</>);
}