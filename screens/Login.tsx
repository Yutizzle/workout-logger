import * as React from 'react';
import { View, SafeAreaView, StyleSheet, Text, TextInput, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

function LoginScreen() {
    return (
        <SafeAreaView style={loginStyles.viewContainer}>
            {/* Background Image */}
            <Image style={loginStyles.titleBackground}
                source={require('../assets/plate-weight.jpg')} 
            />

            {/* App Title */}
            <View style={loginStyles.titleContainer}>
                <Text style={loginStyles.title}>Workout Logger</Text>
            </View>
            
            {/* Login Area */}
            <View style={loginStyles.loginContainer}>
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
                    <Text>Don't have an account?</Text>
                    <TouchableOpacity
                        onPress={() => console.log('signing up!')}
                    >
                        <Text style={loginStyles.links}> Sign Up!</Text>
                    </TouchableOpacity>
                </View>

                {/*  */}
            </View>
        </SafeAreaView>
    );
}

const loginStyles = StyleSheet.create({
    viewContainer: {
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 20,
        backgroundColor: '#fff'
    },
    titleContainer: {
        height: '30%',
        width: '100%',
        flexShrink: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 36,
        color: '#fff',
        textShadowColor: '#000',
        textShadowOffset: {width: 5, height: 5},
        textShadowRadius: 10
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
        width: '100%',
        paddingTop: 40,
        paddingLeft: 20,
        paddingRight: 20,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        flex: 1,
        backgroundColor: '#fff'
    },
    inputs: {
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
        fontSize: 16,
        color: '#fff'
    },
    registerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    links: {
        color: '#AB47BC'
    }
});


export default LoginScreen;