import { StyleSheet } from "react-native";

// LoginScreen styles
export default StyleSheet.create({
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
    },
    errorText: {
        fontFamily: 'OpenSans_400Regular',
        fontSize: 14,
        color: 'red',
        alignSelf: 'center'
    }
});