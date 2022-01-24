import React from 'react'
import { KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import CommonStyles from '../styles/Common'
import { AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { MenuHeader } from '../components/Header'

const MenuScreen = () => {
    const navigation = useNavigation();
    return(
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={CommonStyles.viewContainer}>
            <StatusBar style="dark"/>
            <ScrollView contentContainerStyle={CommonStyles.flexGrow}>
                <MenuHeader />
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default MenuScreen;