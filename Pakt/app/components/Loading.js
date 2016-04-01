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

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  loading: {
    width: 150,
    height: 150,
    justifyContent: 'center',
  },
});

const Loading = () => (
  <View style={styles.loadingContainer} >
    <Image source={ require('../assets/img/loading.gif') }
      style={styles.loading}
    />
  </View>
);

module.exports = Loading;
