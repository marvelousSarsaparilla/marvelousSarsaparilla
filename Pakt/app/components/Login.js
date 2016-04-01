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
var FBLogin = require('react-native-facebook-login');
var FBLoginManager = require('NativeModules').FBLoginManager;

class Login extends React.Component {

  getInitialState(){
    return {
      user: null,
    };
  }

  handleLogin (){
    var _this = this;
    FBLoginManager.login(function(error, data){
      if (!error) {
        _this.setState({ user : data});
        _this.props.onLogin && _this.props.onLogin();
        this.props.beginLoginFbUser();
        this.props.loginFbUser(data.credentials);
      } else {
        console.log(error, data);
      }
    });
  }

  handleLogout(){
    var _this = this;
    FBLoginManager.logout(function(error, data){
      if (!error) {
        this.props.logoutFbUser();
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
      : this.handleLogin();

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
    var text = this.state.user ? "Log out" : "Log in with Facebook";
    return (
      <View style={this.props.style}>
        <TouchableHighlight
          style={styles.container}
          onPress={this.onPress}
        >
          <View style={styles.FBLoginButton}>
            <Image style={styles.FBLogo} source={require('../assets/img/fbLogo.png')} />
            <Text style={[styles.FBLoginButtonText, this.state.user ? styles.FBLoginButtonTextLoggedIn : styles.FBLoginButtonTextLoggedOut]}
              numberOfLines={1}>{text}</Text>
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
    width: 100,
  },
  FBLoginButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    height: 30,
    width: 175,
    paddingLeft: 2,
    margin:5,

    // backgroundColor: 'white',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: 'rgb(66,93,174)',

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
  FBLoginButtonTextLoggedIn: {
    marginLeft: 5,
  },
  FBLoginButtonTextLoggedOut: {
    marginLeft: 18,
  },
  FBLogo: {
    position: 'absolute',
    height: 14,
    width: 14,

    left: 7,
    top: 7,
  },
});

module.exports = Login;