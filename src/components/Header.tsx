import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { Header } from 'react-native-elements'
import { MaterialIcons } from '@expo/vector-icons'
import CommonStyles from '../styles/Common'
import { useNavigation } from '@react-navigation/native'
import { MenuScreenUseNavigationProp } from '../common/types'
import { AntDesign } from '@expo/vector-icons'

export const MainHeader = () => {
    const navigation = useNavigation<MenuScreenUseNavigationProp>();

    return(
        <Header
            backgroundColor=""
            backgroundImageStyle={{}}
            barStyle="default"
            centerComponent={
                <Text style={CommonStyles.headerTitle}>
                    Today's Workout
                </Text>}
            centerContainerStyle={CommonStyles.justifyCenter}
            containerStyle={CommonStyles.headerContainer}
            leftComponent={
                <TouchableOpacity onPress={() => {navigation.navigate('MenuScreen')}}>
                    <View style={CommonStyles.rotate90}>
                        <MaterialIcons name="bar-chart" style={CommonStyles.headerIcons} />
                    </View>
                </TouchableOpacity>
            }
            leftContainerStyle={CommonStyles.justifyCenter}
            placement="center"
            rightComponent={{}}
            rightContainerStyle={CommonStyles.justifyCenter}
            statusBarProps={{}}
            />
    );
}

export const MenuHeader = () => {
    const navigation = useNavigation<MenuScreenUseNavigationProp>();

    return(
        <Header
            backgroundColor=""
            backgroundImageStyle={{}}
            barStyle="default"
            centerComponent={
                <Text style={CommonStyles.headerTitle}>
                    Menu
                </Text>}
            centerContainerStyle={CommonStyles.justifyCenter}
            containerStyle={CommonStyles.headerContainer}
            leftComponent={
                <TouchableOpacity onPress={() => {navigation.goBack()}}>
                    <AntDesign name="arrowleft" style={CommonStyles.headerIcons} />
                </TouchableOpacity>
            }
            leftContainerStyle={CommonStyles.justifyCenter}
            placement="center"
            rightComponent={{}}
            rightContainerStyle={CommonStyles.justifyCenter}
            statusBarProps={{}}
            />
    );
}

export const WorkoutHeader = (props: {workoutName: string}) => {
    const navigation = useNavigation<MenuScreenUseNavigationProp>();

    return(
        <Header
            backgroundColor=""
            backgroundImageStyle={{}}
            barStyle="default"
            centerComponent={
                <Text style={CommonStyles.headerTitle}>
                    {props.workoutName}
                </Text>}
            centerContainerStyle={CommonStyles.justifyCenter}
            containerStyle={CommonStyles.headerContainer}
            leftComponent={
                <TouchableOpacity onPress={() => {navigation.goBack()}}>
                    <AntDesign name="arrowleft" style={CommonStyles.headerIcons} />
                </TouchableOpacity>
            }
            leftContainerStyle={CommonStyles.justifyCenter}
            placement="center"
            rightComponent={
                <TouchableOpacity onPress={() => {navigation.navigate('MenuScreen')}}>
                    <View style={CommonStyles.rotate90}>
                        <MaterialIcons name="bar-chart" style={CommonStyles.headerIcons} />
                    </View>
                </TouchableOpacity>
            }
            rightContainerStyle={CommonStyles.justifyCenter}
            statusBarProps={{}}
            />
    );
}