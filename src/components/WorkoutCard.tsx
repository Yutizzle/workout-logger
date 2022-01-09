import React, { ReactElement } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { Card } from 'react-native-elements'
import CommonStyles from '../styles/Common'
import { WelcomeScreenUseNavigationProp, WorkoutData, WorkoutHistory } from '../common/types'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useInsert, useRealtime } from 'react-supabase';
import { useAuth } from '../hooks/useAuth';
import { useNavigation } from '@react-navigation/native';
import { UseSelectState } from 'react-supabase';


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

export const WorkoutCard = (props: {workouts: WorkoutData[] | null | undefined}) => {
    const { session, user } = useAuth();
    const navigation = useNavigation<WelcomeScreenUseNavigationProp>();
    const [insertState , insertHistory] = useInsert('user_workout_history');

    const startWorkout = async (data: WorkoutHistory) => {
        if(session && user?.id) {
            //add workout history if not exists
            if(data.workout_history_id == null) {
                await insertHistory({
                    user_id: user?.id,
                    program_id: data.program_id,
                    workout_id: data.workout_id,
                    program_cycle: data.program_cycle,
                    program_run: data.program_run,
                    start_time: new Date()
                });
            }
            
            if(insertState.error) {
                console.log(insertState.error);
            } else {
                navigation.navigate('WorkoutScreen');
            }
        }
    }

    const WorkoutButtonContent = (fetching: boolean, workoutData: WorkoutHistory) => {
        let buttonText = 'Start Workout';
        if(workoutData.workout_history_id !== null)
            buttonText = 'Resume Workout';
    
        return (
            <>
            {fetching ? 
                <ActivityIndicator size="small" color="#fff"></ActivityIndicator> :
                <Text style={CommonStyles.buttonText}>{buttonText}</Text>
            }
            </>
        );
    }

    if(props.workouts) { 
        const cards: ReactElement[] = [];

        /* get unique workouts from json data */
        const workouts = new Set<string>(
            props.workouts.map((w:WorkoutData) => JSON.stringify({
                workout_id: w.workout_id, 
                workout_history_id: w.workout_history_id,
                workout_name: w.workout_name, 
                program_id: w.program_id, 
                program_run: w.program_run,
                program_cycle: w.current_program_cycle
            }))
        );

        /* for each workout, display each exercise and its details */
        workouts.forEach((workout) => {
            const currWorkout: WorkoutHistory = JSON.parse(workout);
            let prevExercise = '';

            /* get and display exercise data for current workout */
            const exerciseList = props.workouts?.filter((exercise: WorkoutData) => exercise.workout_id === currWorkout.workout_id)
                .map((exercise: WorkoutData, i: number) => {
                    if (exercise.exercise !== prevExercise) {
                        prevExercise = exercise.exercise;
                        return (
                            <React.Fragment key={`${exercise.workout_name}-${currWorkout.workout_id}-${i}`}>
                                {/* Exercise Name */}
                                <Exercise key={`${exercise.exercise}-${currWorkout.workout_id}`} exercise={exercise.exercise}></Exercise>
                                {/* Exercise Set Detail */}
                                <ExerciseDetail key={`${exercise.exercise}-${exercise.set}-${currWorkout.workout_id}`} exercise={exercise}></ExerciseDetail>
                            </React.Fragment>
                        );
                    } else {
                        {/* Exercise Set Detail */}
                        return(<ExerciseDetail key={`${exercise.exercise}-${exercise.set}-${currWorkout.workout_id}`} exercise={exercise}></ExerciseDetail>);
                    }    
                }
            );
        
            cards.push(
                <Card key={currWorkout.workout_id} containerStyle={CommonStyles.cardContainer} wrapperStyle={{}}>
                    {/* Workout Title*/}
                    <Card.Title style={CommonStyles.cardTitle}>{currWorkout.workout_name}</Card.Title>
                    <Card.Divider />
                    {/* Exercise List */}
                    <View style={CommonStyles.cardTextContainer}>{exerciseList}</View>
                    {/* Start Workout Button */}
                    <TouchableOpacity style={CommonStyles.buttons}
                                        onPress={() => {startWorkout({
                                            program_id: currWorkout.program_id, 
                                            program_run: currWorkout.program_run, 
                                            program_cycle: currWorkout.program_cycle, 
                                            workout_id: currWorkout.workout_id,
                                            workout_name: currWorkout.workout_name,
                                            workout_history_id: currWorkout.workout_history_id})
                                        }}
                                    >
                        {WorkoutButtonContent(insertState.fetching, currWorkout)}
                    </TouchableOpacity>
                </Card>
            );
        });

        return <>{cards}</>
    } else {
        return <></>
    }
}

