import GetPakts from '../containers/GetPakts';
import LoginUser from '../containers/LoginUser';
import Landing from '../components/Landing';
import CreatePakt from '../containers/CreatePakt';
import Camera from '../components/Camera';
import GetCurrentPakt from '../containers/GetCurrentPakt';
import { connect } from 'react-redux';
import { Scene, Router, TabBar, Modal, Schema, Actions, Switch } from 'react-native-router-flux';
import SendPicture from '../containers/SendPicture';
import Header from '../components/Header';
import Loading from '../components/Loading';
import globalStyles from '../utils/globalStyles';

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
  tabBar: {
    backgroundColor: globalStyles.colors.main,
  },
  icon: {
    width: 75,
    height: 75,
  },
});

// tabs for bottom navBar
class TabIcon extends React.Component {
  render() {
    return (
      <Image source={ this.props.menuIcon } style={styles.icon} />
    );
  }
}

// function determines if user is logged in, if not, returns the 'login' id
const mapStateToProps = (state) => {
  return {
    selector: () => {
      if (state.users.currentUser) {
        return 'tabbar';
      } else if (state.users.loggingIn) {
        return 'loading';
      } else {
        return 'landing';
      }
    },
  };
};

const App = () => (
  <View style={{ flex: 1, backgroundColor: '#F5FCFF' }}>
    <View style={{ flex: 0.12 }}>
      <Header title={'PAKT'} />
    </View>
    <View style={{ flex: 0.88 }}>
      <Router scenes={scenes} />
    </View>
  </View>
);

const scenes = Actions.create(
  <Scene key="root" component={connect(mapStateToProps, null)(Switch)} tabs={true}>
    <Scene hideNavBar="true" key="landing" title="Landing" component={Landing} />
    <Scene hideNavBar="true" key="loading" component={Loading} title="Camera" icon={TabIcon} />

    <Scene key="tabbar" tabs={true} default="getPakts" style={styles.tabBar}>
      <Scene hideNavBar="true" key="pakts" title="Pakts"
        icon={TabIcon} menuIcon={require('../assets/img/list.png')}
      >
        <Scene key="getPakts" component={GetPakts} title="GetPakts" />
        <Scene key="individualPakt" component={GetCurrentPakt} title="IndividualPakt" />
      </Scene>
      <Scene hideNavBar="true" key="camera" component={SendPicture}
        icon={TabIcon} menuIcon={require('../assets/img/camera.png')}
      />
      <Scene hideNavBar="true" key="createPakt" component={CreatePakt} title="Create Pakt"
        icon={TabIcon} menuIcon={require('../assets/img/edit.png')}
      />
    </Scene>
  </Scene>
);

export default App;
