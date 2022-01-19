import React, { ReactElement, useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { Card } from 'react-native-elements'
import CommonStyles from '../styles/Common'
import { WelcomeScreenUseNavigationProp, WorkoutData, WorkoutHistory } from '../common/types'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useInsert } from 'react-supabase';
import { useAuth } from '../hooks/useAuth';
import { useNavigation } from '@react-navigation/native';

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

export const WorkoutCard = (props: {workouts: WorkoutData[]}) => {
    const { session, user } = useAuth();
    const navigation = useNavigation<WelcomeScreenUseNavigationProp>();
    const [ insertState , insertHistory ] = useInsert('user_workout_history');
    const [ workouts, setWorkouts ] = useState<WorkoutHistory[]>([]);
    const [ exerciseData, setExerciseData ]  = useState<WorkoutData[]>([]);
    const cards: ReactElement[] = [];
    
    const startWorkout = async (data: WorkoutHistory, idx: number) => {
        if(session && user?.id) {
            let workoutHistoryId = data.workout_history_id ?? 0;

            //add workout history if not exists
            if(workoutHistoryId == 0) {
                const insert = await insertHistory({
                    user_id: user?.id,
                    program_id: data.program_id,
                    workout_id: data.workout_id,
                    program_cycle: data.program_cycle,
                    program_run: data.program_run,
                    start_time: new Date()
                });

                workoutHistoryId = insert.data[0].id;
                
                setWorkouts(prevState => { 
                    const workouts = [...prevState];
                    workouts[idx] = {...workouts[idx], workout_history_id: workoutHistoryId};
                    return workouts;
                });

                setExerciseData(prev => {
                    return prev.map((set) => {
                        set.workout_history_id = workoutHistoryId;
                        return set;
                    });
                });
                
            }

            if(insertState.error) {
                console.log(insertState.error);
            } else {
                navigation.navigate('WorkoutScreen', { 
                    workout_data: exerciseData,
                    workout_name: data.workout_name,
                    workout_history_id: workoutHistoryId,
                    program_id: data.program_id,
                    next_program_cycle: data.next_program_cycle,
                    next_workout_id: data.next_workout_id
                });
            }
            
        }
    }

    useEffect(() => {
        if(props.workouts) { 
            /* get unique workouts from json data */
            const temp = new Set<string>(
                props.workouts.map((w:WorkoutData, index) => JSON.stringify({
                    workout_id: w.workout_id, 
                    workout_history_id: w.workout_history_id,
                    workout_name: w.workout_name, 
                    program_id: w.program_id, 
                    program_run: w.program_run,
                    program_cycle: w.current_program_cycle,
                    next_program_cycle: w.next_program_cycle,
                    next_workout_id: w.next_workout_id
                }))
            );
            
            const workouts = Array.from(temp).map(workout => { return JSON.parse(workout)});
            setWorkouts(workouts);
            setExerciseData(props.workouts)
        }
    }, [props.workouts]);

    if(workouts) {
        /* for each workout, display each exercise and its details */
        workouts.forEach((workout, index) => {
            let prevExercise = '';

            /* get and display exercise data for current workout */
            const exerciseList = props.workouts?.filter((exercise: WorkoutData) => exercise.workout_id === workout.workout_id)
                .map((exercise: WorkoutData, i: number) => {
                    if (exercise.exercise !== prevExercise) {
                        prevExercise = exercise.exercise;
                        return (
                            <React.Fragment key={`${exercise.workout_name}-${workout.workout_id}-${i}`}>
                                {/* Exercise Name */}
                                <Exercise key={`${exercise.exercise}-${workout.workout_id}`} exercise={exercise.exercise}></Exercise>
                                {/* Exercise Set Detail */}
                                <ExerciseDetail key={`${exercise.exercise}-${exercise.set}-${workout.workout_id}`} exercise={exercise}></ExerciseDetail>
                            </React.Fragment>
                        );
                    } else {
                        {/* Exercise Set Detail */}
                        return(<ExerciseDetail key={`${exercise.exercise}-${exercise.set}-${workout.workout_id}`} exercise={exercise}></ExerciseDetail>);
                    }    
                }
            );
            
            cards.push(
                <Card key={workout.workout_id} containerStyle={CommonStyles.cardContainer} wrapperStyle={{}}>
                    {/* Workout Title*/}
                    <Card.Title style={CommonStyles.cardTitle}>{workout.workout_name}</Card.Title>
                    <Card.Divider />
                    {/* Exercise List */}
                    <View style={CommonStyles.cardTextContainer}>{exerciseList}</View>
                    {/* Start Workout Button */}
                    <TouchableOpacity style={CommonStyles.buttons}
                                        onPress={async () => {await startWorkout({
                                            program_id: workout.program_id, 
                                            program_run: workout.program_run, 
                                            program_cycle: workout.program_cycle, 
                                            workout_id: workout.workout_id,
                                            workout_name: workout.workout_name,
                                            workout_history_id: workout.workout_history_id,
                                            next_program_cycle: workout.next_program_cycle,
                                            next_workout_id: workout.next_workout_id}, index)
                                        }}
                                    >
                        {
                            insertState.fetching ? 
                                <ActivityIndicator size="small" color="#fff"></ActivityIndicator> :
                                <Text style={CommonStyles.buttonText}>
                                    {workouts[index].workout_history_id != null ? 'Resume Workout' : 'Start Workout'}
                                </Text>
                        }
                    </TouchableOpacity>
                </Card>
            );
        });

        return <>{cards}</>
    } else {
        return <></>
    }
}
