import React, {
  AppRegistry,
  Component,
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
  PropTypes,
  RefreshControl,
  ScrollView,
} from 'react-native';

import PaktListItem from './PaktListItem';
import Loading from './Loading';
import globalStyles from '../utils/globalStyles';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  scrollView: {
    flex: 1,
    backgroundColor: '#D0D6D6',
    marginBottom: 48,
  },
});

class PaktList extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.listThePakts();
  }

  renderPaktsView() {
    const { pakts, onPaktClick, isRefreshing, onRefresh, currentUserId } = this.props;
    const rows = pakts.map((pakt) => {
      return <PaktListItem pakt={pakt} onPaktClick={onPaktClick} currentUserId={currentUserId} />;
    });

    if (rows.length > 0) {
      return (
        <ScrollView style={styles.scrollView}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefresh}
              tintColor="#00A79D"
              colors={['#D0D6D6', '#D0D6D6', '#D0D6D6']}
              progressBackgroundColor="#D0D6D6" />
            }>
          {rows}
        </ScrollView>
      );
    } else {
      return null;
    }
  }

  render() {
    const { isFetching } = this.props;
    return (isFetching) ? <Loading displayText = {'Loading Pakts...'}/> : this.renderPaktsView();
  }

}

export default PaktList;
