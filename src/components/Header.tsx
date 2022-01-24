import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { Header } from 'react-native-elements'
import { MaterialIcons } from '@expo/vector-icons'
import CommonStyles from '../styles/Common'
import { useSignOut } from 'react-supabase'
import { useNavigation } from '@react-navigation/native'
import { MenuScreenUseNavigationProp } from '../common/types'
import { AntDesign } from '@expo/vector-icons'

export const CommonHeader = () => {
    const [ signOutState, signOut ] = useSignOut();
    const navigation = useNavigation<MenuScreenUseNavigationProp>();

    const signout = async () => {
        await signOut();
        if(signOutState.error) {
            console.log('error:', signOutState.error);
        }
    }

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
            rightComponent={
                <TouchableOpacity onPress={async () => {await signout()}}>
                    <MaterialIcons name="logout" style={CommonStyles.headerIcons} />
                </TouchableOpacity>
            }
            rightContainerStyle={CommonStyles.justifyCenter}
            statusBarProps={{}}
            />
    );
}

export const MenuHeader = () => {
    const [ signOutState, signOut ] = useSignOut();
    const navigation = useNavigation<MenuScreenUseNavigationProp>();

    const signout = async () => {
        await signOut();
        if(signOutState.error) {
            console.log('error:', signOutState.error);
        }
    }

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
            rightComponent={
                <TouchableOpacity onPress={async () => {await signout()}}>
                    <MaterialIcons name="logout" style={CommonStyles.headerIcons} />
                </TouchableOpacity>
            }
            rightContainerStyle={CommonStyles.justifyCenter}
            statusBarProps={{}}
            />
    );
}