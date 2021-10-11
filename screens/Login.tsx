import * as React from 'react';
import { View, SafeAreaView, StyleSheet, Text, TextInput, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

function LoginScreen() {
    return (
        <View style={loginStyles.viewContainer}>
            {/* Background Image */}
            <Image style={loginStyles.titleBackground}
                source={require('../assets/plate-weight.jpg')} 
            />

            {/* Login Area */}
            <View style={loginStyles.loginContainer}>

                {/* App Title */}
                <View style={loginStyles.titleContainer}>
                    <Text style={loginStyles.title}>Workout Logger</Text>
                </View>

                {/* Username Field */}
                <TextInput style={loginStyles.inputs}
                    placeholder="Username"
                />

                {/* Password Field */}
                <TextInput style={loginStyles.inputs}
                    placeholder="Password"
                />

                {/* Login Button */}
                <TouchableOpacity style={loginStyles.buttons}
                    onPress={() => console.log('logging in!')}
                >
                    <Text style={loginStyles.buttonText}>Login</Text>
                </TouchableOpacity>

                {/* Register Link */}
                <View style={loginStyles.registerContainer}>
                    <Text style={loginStyles.registerText}>Don't have an account?</Text>
                    <TouchableOpacity
                        onPress={() => console.log('signing up!')}
                    >
                        <Text style={loginStyles.links}> Sign Up!</Text>
                    </TouchableOpacity>
                </View>

                {/*  */}
            </View>
        </View>
    );
}

const loginStyles = StyleSheet.create({
    viewContainer: {
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: '#fff'
    },
    titleContainer: {
        flexShrink: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 10
    },
    title: {
        fontFamily: 'OpenSans_700Bold',
        fontSize: 24,
        color: '#000'
    },
    titleBackground: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        zIndex: 0
    },
    logo: {
        height: 50,
        width: 150,
        margin: 10
    },
    loginContainer: {
        height: '75%',
        width: '100%',
        padding: 20,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        backgroundColor: '#fff'
    },
    inputs: {
        fontFamily: 'OpenSans_400Regular',
        flexDirection: 'column',
        borderColor: '#9E9E9E',
        borderWidth: 2,
        borderRadius: 6,
        padding: 10,
        margin: 10,

    },
    buttons: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4A148C',
        borderRadius: 30,
        padding: 15,
        margin: 10
    },
    buttonGroup: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10
    },
    buttonText: {
        fontFamily: 'OpenSans_400Regular',
        fontSize: 16,
        color: '#fff'
    },
    registerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    registerText: {
        fontFamily: 'OpenSans_400Regular',
    },
    links: {
        fontFamily: 'OpenSans_400Regular',
        color: '#AB47BC'
    }
});


export default LoginScreen;