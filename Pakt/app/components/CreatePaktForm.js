import React, {
  Alert,
  AppRegistry,
  Component,
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
  PropTypes,
  TextInput,
  DatePickerIOS,
  ScrollView,
  TouchableHighlight,
} from 'react-native';

import {
  MKColor,
  MKSlider,
  MKRangeSlider,
  MKTextField,
  MKButton,
  MKIconToggle,
  mdl,
  setTheme,
} from 'react-native-material-kit';
var Button = require('react-native-button');
var _ = require('lodash');
import PaktFriendsForm from './CreatePaktFriendsForm';
import PaktDateForm from './CreatePaktDateForm';

var styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingRight: 30,
    paddingLeft: 30,
    backgroundColor: '#fff',
    marginBottom: 48,
  },
  buttonHolder: {
    flexDirection: 'row',
  },
  TextInput: {
    height: 30,
    width: 200,
    borderColor: 'gray',
    borderWidth: 2,
  },
  button: {
    backgroundColor: '#00A79D',
    marginBottom: 7,
    borderRadius: 2,
    height: 20,
    width: 50,
  },
  subtitle: {
    marginTop: 20,
    marginBottom: 4,
    fontSize: 15,
    justifyContent:'center',
  },
  heading: {
    marginTop: 15,
    fontSize: 22,
    justifyContent:'center',
  },
  buttonContainer: {
    backgroundColor: '#00a79d',
    color: 'white',
    padding: 10,
    margin: 5,
  },
  highlightButton: {
    backgroundColor: '#00A79D',
    color: 'white',
    padding: 10,
    margin: 5,
  },
  noHighlightButton: {
    backgroundColor: '#A9A9A9',
    color: 'white',
    padding: 10,
    margin: 5,
  },
});

class CreatePaktForm extends React.Component {
  constructor(props) {
    super(props); 
    this.state = {};
    // load info for the user's friends
    this.props.listTheFriends();
  }

  getInput(category, event) {
    if (category === 'submit') {
      // add friends who were invited to
      let users = _.filter(this.props.friends, ['selected', true]).map(function(friend){return friend.id}); 
      this.state.users = users;
      // checks every field in the form 
      if(this.state.name === undefined || this.state.description === undefined ||
        this.state.consequenceText  === undefined || this.state.users === 0 ||
        this.state.repeating === undefined || ((!(this.state.frequency > 0) ||
        !(this.state.timeFrame > 0)) && this.state.endDate === undefined)) {
          Alert.alert('Submit Again', 'Please fill every field on the form')
      } else {
        // send info to the database
        this.props.submitFormInputs(this.state);
        //reset the form to empty
        this.state = {};
        //clear selected users
        this.props.friends.forEach(function(x){x.selected = false});
      }
    } else { // If the input is a TextInput, grab the text from the change event
      if(event.nativeEvent){
        this.state[category] = event.nativeEvent.text.trim(); 
      } else{ // If not, input the given value
        this.state[category] = event;
      }
    }
  }

  render() {
    let { friends } = this.props; 
    return (
      <ScrollView style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.heading}>CREATE A PAKT</Text>
          <MKTextField
            tintColor={'#A9A9A9'}
            textInputStyle={{ color: '#000' }}
            placeholder="Name..."
            style={styles.textfield}
            highlightColor={'#00A79D'}
            onChangeText={(text) => this.setState({ name: text })}
            value={this.state.name || ''} />
          <MKTextField
            tintColor={'#A9A9A9'}
            textInputStyle={{ color: '#000' }}
            placeholder="Description..."
            style={styles.textfield}
            highlightColor={'#00A79D'}
            onChangeText={(text) => this.setState({ description: text} )}
            value={this.state.description || ''} />
          <MKTextField
            tintColor={'#A9A9A9'}
            textInputStyle={{ color: '#000' }}
            placeholder="Consequence..."
            style={styles.textfield}
            highlightColor={'#00A79D'}
            onChangeText={(text) => this.setState({ consequenceText: text })}
            value={this.state.consequenceText || ''} />
          <Text style={styles.subtitle}>Friends:</Text>
          <PaktFriendsForm friends={friends} />
          <Text style={styles.subtitle}>Repeating:</Text>
          <View style={styles.buttonHolder}>
            <Button
              style={(this.state.repeating) ? styles.highlightButton : styles.noHighlightButton }
              onPress={()=>this.setState({repeating: true})}
            >
              YES
            </Button>
            <Button
              style={(this.state.repeating === undefined || this.state.repeating === true) ? styles.noHighlightButton : styles.highlightButton }
              onPress={()=>this.setState({repeating: false})}
            >
              NO
            </Button>
          </View>
          {(this.state.repeating === undefined) ? null :  <PaktDateForm  getInput= {this.getInput.bind(this)} repeating= {this.state.repeating}/>}
          <Button
            style={styles.buttonContainer}
            styleDisabled={{color: 'red'}}
            onPress={this.getInput.bind(this, 'submit')}
          >
            Submit
          </Button>
        </View>
      </ScrollView>
    );
  }
}

module.exports = CreatePaktForm;
