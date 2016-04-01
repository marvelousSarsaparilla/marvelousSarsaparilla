import React, {
  AppRegistry,
  Component,
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
  PropTypes,
  TouchableHighlight,
  ScrollView,
  Alert,
} from 'react-native';
var _ = require('lodash');
var moment = require('moment');
var Button = require('react-native-button');
import FriendsRow from './FriendsRow';
import ProgressPics from './ProgressPics';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  friendsRow: {
    marginBottom: 10,
  },
  ScrollView: {
    backgroundColor: 'white',
    marginBottom: 50,
  }, 
  subContainer: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  pictureContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  heading: {
    marginTop: 15,
    marginBottom: 6,
    fontSize: 22,
    justifyContent:'center',
    textAlign: 'center',
  },
  subheading: {
    marginBottom: 15,
    fontSize: 18,
    justifyContent:'center',
  },
  subtitle: {
    margin: 4,
    marginBottom: 6,
    fontSize: 15,
    fontWeight: 'bold',
    justifyContent:'center',
    color: '#00a79d',
  },
  info: {
    fontSize: 15,
    margin: 1,
    paddingVertical: 3,
    justifyContent:'center',
    textAlign:'justify',
  },
  buttonContainerAccept: {
    backgroundColor: '#00a79d',
    color: 'white',
    padding: 10,
    margin: 5,
  },
  buttonContainerDecline: {
    backgroundColor: '#A9A9A9',
    color: 'white',
    padding: 10,
    margin: 5,
  },
  sameLine: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

const IndividualPakt = ({ currentPakt, respondtoInvite, accepted, currentUserId, paktPictures, selectedUser, setSelectedUser }) => (
  <View style={styles.container}>
    <ScrollView style= {styles.ScrollView} showsVerticalScrollIndicator={false} >
      <Header style={styles.heading} open={currentPakt.open}  win={currentPakt.Pakt_User.win} paktName={currentPakt.name.toUpperCase()}/>
      <Text style={styles.subheading} >{currentPakt.description}</Text>
      <View style={styles.subContainer}>
        <Text style={styles.subtitle}>{'Consequence:'.toUpperCase()}</Text>
        <Text style={styles.info}>{currentPakt.consequenceText}</Text>
      </View>
      { currentPakt.repeating? <DisplayFrequency frequency={currentPakt.frequency}/> : null }
      <View style={styles.subContainer}>
        <Text style={styles.subtitle}>{'Pakt Length:'.toUpperCase()}</Text>
        <Text style={styles.info}>{ formatDate(currentPakt.createdAt) + ' - ' + formatDate(currentPakt.endDate) }</Text>
      </View>
      <View style={styles.subContainer}>
        <Text style={styles.subtitle}>{'Time Left:'.toUpperCase()}</Text>
        <Text style={styles.info}>{countWeeks(currentPakt.endDate)}</Text>
      </View>
      <View>
        <ShowFriends style = {styles.friendsRow} setSelectedUser={setSelectedUser} open={currentPakt.open} friends={currentPakt.Users}/>
        {accepted ? <ProgressPics selectedUser={selectedUser} paktPictures={paktPictures} currentPakt={currentPakt}/> :
          <View style = {styles.sameLine}>
            <Button
              style = { styles.buttonContainerAccept }
              onPress={() => respondtoInvite(true, currentUserId, currentPakt.id)}
            >
              Accept
            </Button>
            <Button 
              style = { styles.buttonContainerDecline}
              onPress={() => Alert.alert(
              'Are you sure you want to decline this Pakt',
              null,
              [
                { text: 'Cancel' },
                { text: 'OK', onPress: () => respondtoInvite(false, currentUserId, currentPakt.id) },
              ]
            )}
            >
              Decline
            </Button>

          </View>
          }
      </View>
    </ScrollView>
  </View>
);

class ShowFriends extends React.Component {
  FriendsView () {
    const {open, friends, currentPakt, setSelectedUser} = this.props;
    return (
      <View>
        <Text style={styles.subtitle}>{'Friends:'.toUpperCase()}</Text>
        <FriendsRow setSelectedUser={setSelectedUser} numAllowedClicks={1} friends={friends}/> 
      </View>
    );
  }
  render(){
    const {open, friends, currentPakt, setSelectedUser} = this.props;
    return open ? this.FriendsView() : <WinnersLosersView setSelectedUser={setSelectedUser} friends={friends}/>;
  }
}

class WinnersLosersView extends React.Component {
  constructor(props) {
    super(props);
    const {friends} =  this.props;
    //make winners and losers array from the friends array
    this.state = {};
    this.state.losers = friends.filter(function(x){return x.Pakt_User.win === false});
    this.state.winners = friends.filter(function(x){return x.Pakt_User.win === true});
  }
  render(){
    return (
      <View>
        <Text style={styles.subtitle}>{'Winners:'.toUpperCase()}</Text>
        <FriendsRow setSelectedUser={this.props.setSelectedUser} numAllowedClicks={1} friends={this.state.winners}/>
        <Text style={styles.subtitle}>{'Losers:'.toUpperCase()}</Text>
        <FriendsRow setSelectedUser={this.props.setSelectedUser} numAllowedClicks={1} friends={this.state.losers}/>
      </View>
    );  
  };
}

class Header extends React.Component {
  renderWinLossHeading() {
    const { win, paktName } = this.props;
    return (
      win ? 'You won '+ paktName + '!' : 'You lost ' + paktName
    );
  }
  render(){
    const {open, paktName} = this.props;
    return (
      <View>
        <Text style={styles.heading}>{ open ? paktName : this.renderWinLossHeading() }</Text>
     </View>
    );
  }
}

const DisplayFrequency = ({ frequency }) => (
  <View style={styles.subContainer}>
    <Text style={styles.subtitle}>{'Times Per Week: '.toUpperCase()}</Text>
    <Text style={styles.info}>{frequency}</Text>
  </View>
);

// Moment js date display formating helpers
const countWeeks = (endDate) =>   {
  var end = moment(endDate);
  var start = moment(new Date());
  var weeksLeft = end.diff(start, 'weeks', true);
  var numWeeksLeft = Math.ceil(parseFloat(weeksLeft));
  if (numWeeksLeft <= 1){
     daysLeft = end.diff(start, 'days', true);
     var numDaysLeft = Math.ceil(parseFloat(daysLeft));
     return numDaysLeft + ' days';
  } 
  return numWeeksLeft + ' weeks';
};

const formatDate = (date) =>   {
  return moment(date).format("MMMM Do");
};

export default IndividualPakt;
