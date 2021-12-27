import { StyleSheet } from "react-native";

// LoginScreen styles
export default StyleSheet.create({
    viewContainer: {
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        width: '100%',
        height: '100%'
    },
    flexGrow: {
        flexGrow: 1
    },
    halfBasis: {
        flexBasis: '50%'
    },
    thirdBasis: {
        flexBasis: '33.3%'
    },
    marginRightSm: {
        marginRight: 2.5
    },
    marginLeftSm: {
        marginLeft: 2.5
    },
    titleContainer: {
        flexShrink: 1,
        flexGrow: 0,
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
    registerContainer: {
        height: '100%',
        width: '100%',
        padding: 20,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        backgroundColor: '#fff'
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderColor: '#9E9E9E',
        borderWidth: 2,
        borderRadius: 6,
        padding: 10,
        marginTop: 5,
        marginBottom: 5
    },
    inputSpacerLeft: {
        flexDirection: "row",
        paddingLeft: 5
    },
    inputSpacerRight: {
        flexDirection: "row",
        paddingRight: 5
    },
    inputInvalidContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderColor: '#ff0033',
        borderWidth: 2,
        borderRadius: 6,
        padding: 10,
        marginTop: 5,
        marginBottom: 5
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
    linkContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    registerText: {
        fontFamily: 'OpenSans_400Regular',
    },
    inputLabel: {
        fontSize: 12,
        paddingLeft: 10
    },
    inlineInputRowContainer: {
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'space-between',
        width: '100%'
    },
    inlineInput: {
        width: 40
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