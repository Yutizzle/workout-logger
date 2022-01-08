import React, { ReactElement } from 'react';
import { View, Text } from 'react-native';
import { Card } from 'react-native-elements'
import CommonStyles from '../styles/Common'
import { WorkoutData } from '../common/types'
import { TouchableOpacity } from 'react-native-gesture-handler';

const Exercise = (props: {exercise: string}) => {
    return (
        <Text style={CommonStyles.cardTextHead}>
            {props.exercise}
        </Text>
    );
}

const ExerciseDetail = (props: {exercise: WorkoutData}) => {
    return (
        <View style={CommonStyles.cardTextRowContainer}>
            {props.exercise.set ? <Text style={CommonStyles.cardText}>Set: {props.exercise.set}</Text> : <></>}
            {props.exercise.reps ? <Text style={CommonStyles.cardText}>Reps: {props.exercise.reps}</Text> : <></>}
            {props.exercise.weight ? <Text style={CommonStyles.cardText}>Weight: {props.exercise.weight} lbs</Text> : <></>}
            {props.exercise.set_duration ? <Text style={CommonStyles.cardText}>Set Duration: {props.exercise.set_duration} secs</Text> : <></>}
        </View>
    );
}

export const WorkoutCard = (props: {workouts: WorkoutData[] | any}) => {
    if(props.workouts) { 
        const cards: ReactElement[] = [];

        /* get unique workouts names from json data */
        const workouts = new Set<string>(props.workouts.map((w:WorkoutData) => w.workout_name));

        /* for each workout, display each exercise and its details */
        workouts.forEach((workout) => {
            let prevExercise = '';

            /* get and display exercise data for current workout */
            const exerciseList = props.workouts
                .filter((exercise: WorkoutData) => exercise.workout_name === workout)
                .map((exercise: WorkoutData, i: number) => {
                    if (exercise.exercise !== prevExercise) {
                        prevExercise = exercise.exercise;
                        return (
                            <>
                                {/* Exercise Name */}
                                <Exercise key={exercise.exercise} exercise={exercise.exercise}></Exercise>
                                {/* Exercise Set Detail */}
                                <ExerciseDetail key={i} exercise={exercise}></ExerciseDetail>
                            </>
                        );
                    } else {
                        {/* Exercise Set Detail */}
                        return(<ExerciseDetail key={i} exercise={exercise}></ExerciseDetail>);
                    }    
                }
            );
        
            cards.push(
                <Card containerStyle={CommonStyles.cardContainer} wrapperStyle={{}}>
                    {/* Workout Title*/}
                    <Card.Title style={CommonStyles.cardTitle}>{workout}</Card.Title>
                    <Card.Divider />

                    {/* Exercise List */}
                    <View style={CommonStyles.cardTextContainer}>{exerciseList}</View>

                    {/* Start Workout Button */}
                    <TouchableOpacity style={CommonStyles.buttons}
                                    onPress={() => {}}
                                >
                            <Text style={CommonStyles.buttonText}>Start Workout</Text>
                    </TouchableOpacity>
                </Card>
            );
        });

        return <>{cards}</>
    } else {
        return <></>
    }
}

