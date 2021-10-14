import * as React from 'react';
import { View, ImageBackground, StyleSheet, Text, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Ionicons} from '@expo/vector-icons'

function LoginScreen() {
    const [passHide, togglePassHide] = React.useState(true);
    return (
        <View style={loginStyles.viewContainer}>
            {/* Background Image */}
            <ImageBackground style={loginStyles.backgroundImage}
                source={require('../assets/images/plate-weight.jpg')} 
            >
                {/* Login Area */}
                <View style={loginStyles.loginContainer}>

                    {/* App Title */}
                    <View style={loginStyles.titleContainer}>
                        <Text style={loginStyles.title}>Workout Logger</Text>
                    </View>

                    {/* Username Field */}
                    <View style={loginStyles.inputContainer}>
                        <TextInput style={loginStyles.inputs}
                            placeholder="Username"
                        />
                    </View>

                    {/* Password Field */}
                    <View style={loginStyles.inputContainer}>
                        <TextInput style={loginStyles.inputs}
                            placeholder="Password"
                            secureTextEntry={passHide}
                            textContentType='password'
                            autoCompleteType='password'
                        />
                        <Ionicons name={passHide ? "eye-off-sharp" : "eye-sharp"} 
                            size={20} 
                            color="gray"
                            onPress={()=>togglePassHide(!passHide)}
                        />
                    </View>

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
                </View>
            </ImageBackground>
        </View>
    );
}

const loginStyles = StyleSheet.create({
    viewContainer: {
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
    backgroundImage: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    loginContainer: {
        height: '75%',
        width: '100%',
        padding: 20,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        backgroundColor: '#fff'
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderColor: '#9E9E9E',
        borderWidth: 2,
        borderRadius: 6,
        padding: 10,
        margin: 10,
    },
    inputs: {
        flex: 1,
        fontFamily: 'OpenSans_400Regular',
    },
    buttons: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4A148C',
        borderRadius: 30,
        padding: 15,
        margin: 10,
        shadowColor: '#000',
        shadowOffset: {height: 3, width: 3},
        shadowRadius: 3,
        shadowOpacity: 0.3
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