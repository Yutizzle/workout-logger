import { StyleSheet, StatusBar } from 'react-native';

// LoginScreen styles
// TODO: create variables for colors and fonts to make it easier to change everywhere
export default StyleSheet.create({
  viewContainer: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#f9f9f9',
    width: '100%',
    height: '100%',
  },
  headerContainer: {
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#f9f9f9',
    alignItems: 'flex-end',
  },
  headerTitle: {
    fontFamily: 'OpenSans_700Bold',
    fontSize: 20,
    color: '#2B3A39',
  },
  headerIcons: {
    fontSize: 32,
    // color: '#353535'
    color: '#2B3A39',
  },
  cardContainer: {
    borderRadius: 25,
    borderWidth: 0,
    borderColor: '#284b63',
    shadowOpacity: 0.3,
    shadowOffset: {
      width: -1,
      height: 2,
    },
    shadowRadius: 6,
    elevation: 3,
    shadowColor: '#284b63',
  },
  cardTitle: {
    fontFamily: 'OpenSans_700Bold',
    color: '#2B3A39',
    fontSize: 18,
  },
  cardTextContainer: {
    padding: 8,
  },
  cardTextRowContainer: {
    flexDirection: 'row',
  },
  cardTextHead: {
    fontFamily: 'OpenSans_700Bold',
    color: '#2B3A39',
    fontSize: 14,
    paddingTop: 8,
  },
  cardText: {
    fontFamily: 'OpenSans_400Regular',
    color: '#2B3A39',
    fontSize: 14,
    paddingLeft: 12,
  },
  menuItemContainer: {
    width: '100%',
    borderBottomColor: '#d9d9d9',
    borderBottomWidth: 1,
    padding: 10,
  },
  todoContainer: {
    padding: 10,
  },
  todoTextHead: {
    fontFamily: 'OpenSans_700Bold',
    color: '#2B3A39',
    fontSize: 18,
    paddingLeft: 4,
  },
  setTodoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingLeft: 10,
  },
  setTodoText: {
    fontFamily: 'OpenSans_400Regular',
    color: '#2B3A39',
    fontSize: 14,
    padding: 8,
  },
  dividerGradient: {
    width: '90%',
    height: 2,
    borderRadius: 1,
  },
  setTodoGradientContainer: {
    shadowColor: '#2B3A39',
    shadowRadius: 2,
    shadowOpacity: 0.3,
    shadowOffset: {
      height: 0,
      width: -2,
    },
    elevation: 3,
    backgroundColor: '#f9f9f9',
    borderRadius: 15,
  },
  setTodoGradient: {
    width: 30,
    height: 30,
    borderRadius: 15,
    padding: 2,
  },
  setTodoGradientContent: {
    flex: 1,
    borderRadius: 15,
    backgroundColor: '#f9f9f9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  setTodoGradientText: {
    fontFamily: 'OpenSans_700Bold',
    color: '#2B3A39',
    fontSize: 18,
  },
  setTodoCompleted: {
    backgroundColor: '#417b5a',
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  setTodoGradientCompleted: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  setTodoIndicatorContainer: {
    paddingLeft: 4,
    paddingRight: 8,
  },
  setTodoIndicator: {
    width: 4,
    height: 50,
    borderRadius: 2,
  },
  opacityNone: {
    opacity: 0,
  },
  flexGrow: {
    flexGrow: 1,
    flexShrink: 0,
  },
  flexShrink: {
    flexGrow: 0,
    flexShrink: 1,
  },
  flexStart: {
    alignSelf: 'flex-start',
  },
  flexEnd: {
    alignSelf: 'flex-end',
  },
  flexDirectionColumn: {
    flexDirection: 'column',
  },
  justifySpaceBetween: {
    justifyContent: 'space-between',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  halfBasis: {
    flexBasis: '50%',
  },
  thirdBasis: {
    flexBasis: '33.3%',
  },
  marginRightSm: {
    marginRight: 2.5,
  },
  marginLeftSm: {
    marginLeft: 2.5,
  },
  titleContainer: {
    flexShrink: 1,
    flexGrow: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  title: {
    fontFamily: 'OpenSans_700Bold',
    fontSize: 24,
    // color: '#4e5d5c'
    // color: '#353535'
    color: '#2B3A39',
  },
  backgroundImage: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  loginContainer: {
    height: '75%',
    width: '100%',
    padding: 20,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor: '#fff',
  },
  registerContainer: {
    height: '100%',
    width: '100%',
    padding: 20,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#9E9E9E',
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    marginTop: 5,
    marginBottom: 5,
  },
  inputSpacerLeft: {
    flexDirection: 'row',
    paddingLeft: 5,
  },
  inputSpacerRight: {
    flexDirection: 'row',
    paddingRight: 5,
  },
  inputInvalidContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ff0033',
    borderWidth: 2,
    borderRadius: 6,
    padding: 10,
    marginTop: 5,
    marginBottom: 5,
  },
  inputs: {
    flex: 1,
    fontFamily: 'OpenSans_400Regular',
    color: '#4e5d5c',
  },
  disabled: {
    opacity: 0.5,
  },
  buttons: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: 30,
    padding: 15,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { height: 3, width: 3 },
    shadowRadius: 3,
    shadowOpacity: 0.3,
  },
  buttonText: {
    fontFamily: 'OpenSans_400Regular',
    fontSize: 16,
  },
  buttonsPrimary: {
    backgroundColor: '#284b63',
  },
  buttonsSecondary: {
    borderColor: '#284b63',
    borderWidth: 1,
    backgroundColor: '#f9f9f9',
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerText: {
    fontFamily: 'OpenSans_400Regular',
    color: '#4e5d5c',
  },
  textLight: {
    color: '#f9f9f9',
  },
  textDark: {
    color: '#284b63',
  },
  inputLabel: {
    fontFamily: 'OpenSans_400Regular',
    fontSize: 12,
    paddingLeft: 10,
    // color: '#4e5d5c'
    color: '#3c6e71',
  },
  inlineInputRowContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    width: '100%',
  },
  inlineInput: {
    width: 40,
  },
  links: {
    fontFamily: 'OpenSans_400Regular',
    color: '#AB47BC',
  },
  errorText: {
    fontFamily: 'OpenSans_400Regular',
    fontSize: 14,
    color: 'red',
    alignSelf: 'center',
  },
  rotate90: {
    transform: [{ rotate: '90deg' }],
  },
});
