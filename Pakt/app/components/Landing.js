import React, {
  AppRegistry,
  Component,
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
  PropTypes,
} from 'react-native';
import LoginUser from '../containers/LoginUser';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
  },
});

const Landing = ({ title }) => (
  <View style={styles.container} >
    <Image source={{uri: 'https://static.pexels.com/photos/2029/landing-stage-sea-holiday-vacation.jpg'}} style={{width: 400, height: 606}}  />
  </View>
);

module.exports = Landing;