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
import globalStyles from '../utils/globalStyles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: globalStyles.colors.main,
    paddingRight: 10,
  },

   title: {
    flex: .6,
    marginTop: 20,
    alignItems: 'flex-end',
  },

   logo: {
    width:180,
    height: 51,
  },

   logout: {
    flex: .2,
    fontWeight: 'bold',
    marginTop: 10,
    alignItems: 'flex-end',
  },
});

const Header = ({ title }) => (
<View style={styles.container} >
  <View style={styles.title}>
    <Image  style={styles.logo} source={require('../assets/img/pakt_logo_full.png')} />
  </View>

    <View style={styles.logout}>
      <LoginUser/>
    </View>
</View>
);

module.exports = Header;