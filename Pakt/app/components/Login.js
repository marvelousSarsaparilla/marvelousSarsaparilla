import React, {
  AppRegistry,
  Component,
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
  PropTypes,
  TouchableHighlight
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import globalStyles from '../utils/globalStyles';

var FBLogin = require('react-native-facebook-login');
var FBLoginManager = require('NativeModules').FBLoginManager;

class Login extends React.Component {

  constructor(props) {
    super(props); 
    this.state = {};
    this.state.user= null;
  }

  handleLogin (){
    var _this = this;
    FBLoginManager.login(function(error, data){
      if (!error) {
        _this.setState({ user : data});
        _this.props.onLogin && _this.props.onLogin();
        _this.props.beginLoginFbUser();
        _this.props.loginFbUser(data.credentials);
      } else {
        console.log(error, data);
      }
    });
  }

   handleLogout = () => {
    var _this = this;
    FBLoginManager.logout(function(error, data){
      if (!error) {
        _this.props.logoutFbUser();
        _this.setState({ user : null});
        _this.props.onLogout && _this.props.onLogout();
      } else {
        console.log(error, data);
      }
    });
  }

  onPress(){
    this.state.user
      ? this.handleLogout()
      : this.handleLogin.bind(this)();

    this.props.onPress && this.props.onPress();
  }

  componentWillMount(){
    var _this = this;
    FBLoginManager.getCredentials(function(error, data){
      if (!error) {
        _this.setState({ user : data})
      }
    });
  }

  render() {
    var text = 'Log in';
    if (this.state.user) {
      text = 'Log out';
      //if there's a login found, add the user's object to the redux state
      this.props.beginLoginFbUser();
      this.props.loginFbUser(this.state.user.credentials);
    } 

    return (
      <View style={this.props.style}>
        <TouchableHighlight
          style={styles.container}
          onPress={this.onPress.bind(this)}
          underlayColor={globalStyles.colors.main} 
        >
          <View style={styles.FBLoginButton}>
            <Image style={styles.FBLogo} source={require('../assets/img/logout.png')} />
          </View>
        </TouchableHighlight>
      </View>
    );
  }
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 86,
  },
  FBLoginButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    height: 30,
    width: 10,
    paddingLeft: 4,
    margin:2,

    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    },
  },
  FBLoginButtonText: {
    color: 'white',
    fontWeight: '600',
    fontFamily: 'Helvetica neue',
    fontSize: 12,
    margin: 2,
  },

  FBLogo: {
    position: 'absolute',
    height: 55,
    width: 56,
  },
});

module.exports = Login;