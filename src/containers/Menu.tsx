import React from 'react'
import { ScrollView, View, Text, TouchableOpacity} from 'react-native'
import { StatusBar } from 'expo-status-bar'
import CommonStyles from '../styles/Common'
import { MenuHeader } from '../components/Header'
import { useSignOut } from 'react-supabase'

const MenuItem = (props: {name: string, onPress: () => void}) => {
    return (
        <TouchableOpacity style={CommonStyles.menuItemContainer} onPress={props.onPress}>
            <Text style={[CommonStyles.headerTitle]}>{props.name}</Text>
        </TouchableOpacity>
    );
}

const MenuScreen = () => {
    const [signOutState, signOut] = useSignOut();

    const signout = async () => {
        await signOut();
        if(signOutState.error) {
            console.log('error:', signOutState.error);
        }
    }

    return(
        <View style={CommonStyles.viewContainer}>
            <StatusBar style="dark"/>
            <ScrollView contentContainerStyle={CommonStyles.flexGrow}>
                <MenuHeader />
                <View style={[CommonStyles.flexGrow, CommonStyles.flexDirectionColumn]}>
                    <View style={CommonStyles.flexGrow}>
                        <MenuItem name={'My Programs'} onPress={() => {}}/>
                    </View>
                    <View style={CommonStyles.flexShrink}>
                    <TouchableOpacity style={[CommonStyles.buttons, CommonStyles.buttonsSecondary]} onPress={async () => {await signout();}}>
                        <Text style={[CommonStyles.buttonText, CommonStyles.textDark]}>Logout</Text>
                    </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default MenuScreen;