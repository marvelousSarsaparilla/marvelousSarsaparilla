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
  },
   headerItem: {
    flexDirection: 'row',
  },
   title: {
    textAlign: 'center',
    // flex: .8,
    textAlign: 'right',
    marginTop: 15,
    // marginLeft: 140,
    fontWeight: 'bold',
    color: 'white',
    fontSize: 45,
    fontFamily: 'Optima',
  },
   logout: {
    // flex: .2,
    fontWeight: 'bold',
    height:100,
    marginTop: 25,
    width:200,
    fontSize: 15,
    alignItems: 'flex-end',
  },
});

const Header = ({ title }) => (
<View style={styles.container} >
  <View style={styles.headerItem} >
    <Text style={styles.title}>{title}</Text>
  </View>
  <View style={styles.headerItem} >
    <View style={styles.logout}>
      <LoginUser/>
    </View>
  </View>
</View>
);

module.exports = Header;