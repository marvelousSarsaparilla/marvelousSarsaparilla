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
  </View>
);

module.exports = Landing;