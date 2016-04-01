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
} from 'react-native';

const styles = StyleSheet.create({
  picContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  subheading: {
    marginTop: 20,
    marginBottom: 4,
    fontSize: 15,
    justifyContent: 'center',
  },
  subtitle: {
    margin: 4,
    marginBottom: 6,
    fontSize: 15,
    fontWeight: 'bold',
    justifyContent:'center',
    color: '#00a79d',
  },
  pic: {
    width: 40,
    height: 40,
    borderRadius:20,
    borderWidth: 2,
    borderColor: '#879191',
  },
  bubble: {
    width: 40,
    height: 40,
    borderRadius:20,
    borderWidth: 2,
    borderColor: '#879191',
  },
  mainPic: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#879191',
    marginLeft: 39,
    marginTop: 5,
  },
  dropDown: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
    marginTop: 5,
  },
  subContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  option: {
    backgroundColor: '#F5FCFF',
  },
});

var _ = require('lodash');
var moment = require('moment');
const DropDown = require('react-native-dropdown');
const {
  Select,
  Option,
  OptionList,
  updatePosition
} = DropDown;

class ProgressPics extends Component {
  constructor(props) {
    super(props);
    const { currentPakt } = this.props;
    const current = moment(new Date());
    const start = moment(new Date(currentPakt.createdAt));
    const weeks = current.diff(start, 'weeks', true);
    const numWeeks = Math.ceil(parseFloat(weeks));
    this.state = { url: undefined, showImage: false, numWeeks: numWeeks, startDate: start.toDate() };
  }

  setMainPic(url) {
    this.setState({ showImage: true, url });
  }

  componentDidMount() {
    updatePosition(this.refs['SELECT1']);
    updatePosition(this.refs['OPTIONLIST']);
  }

  _getOptionList() {
    return this.refs['OPTIONLIST'];
  }

  _numWeeks(number) {
    this.setState({
      ...this.state,
      numWeeks: number
    });
  }

  componentWillReceiveProps() {
    this.setState({ url: undefined, showImage: false, });
  }

  fixDate(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate())
  }

  renderPicsView() {
    const { paktPictures, selectedUser, showImage, currentPakt } = this.props;
    //get selected user name
    let selectedUserName = '';
    currentPakt.Users.forEach(function(user){
      if(user.id === selectedUser){
        console.log('here', user, selectedUser);
       selectedUserName =  user.name.split(' ')[0];
      }
    });
    const totalWeeks = parseInt(currentPakt.timeFrame);
    const numWeeks  = this.state.numWeeks;
    const startDate = this.state.startDate;
    let begWeek = new Date (startDate);
    begWeek.setDate(begWeek.getDate() + (numWeeks - 1) * 7);
    let endWeek = new Date (startDate);
    endWeek.setDate(endWeek.getDate() + (numWeeks) * 7);
    var fixDate = function(date) {
      return new Date(date.getFullYear(), date.getMonth(), date.getDate())
    };
    const selectedUserPics = paktPictures.filter(function (picture) {
      const createDate = new Date(picture.createdAt);
      return picture.UserId === selectedUser &&
      fixDate(createDate) >= fixDate(begWeek) &&
      fixDate(createDate) < fixDate(endWeek);
    });
    const frequency = currentPakt.frequency;
    const picsUploaded = (selectedUser === null) ? 0 : _.find(currentPakt.Users, (user) =>
      user.id === selectedUser).Pakt_User.picsThisWeek;
    const emptyBubbleCount = frequency - picsUploaded;
    const pictures = selectedUserPics.map((pic) => {
      const url = 'https://s3-us-west-1.amazonaws.com/pakt-test/' + pic.path;
      return (
        <TouchableHighlight onPress={() => this.setMainPic(url)}>
          <Image source={{ uri: url }} style={styles.pic} />
        </TouchableHighlight>
      );
    });
    const bubbles = Array.from(new Array(emptyBubbleCount), () => <Image style={styles.bubble} /> );
    const weekChoices = Array.from(new Array(numWeeks), (v, k) => <Option style={styles.option}>{(k + 1)}</Option> );

    return (
      <View>
        <View style={styles.subContainer}>
          <Text style={styles.subtitle}>Selected week:</Text>
          <View style={styles.dropDown}>
            <Select
              width={50}
              ref="SELECT1"
              optionListRef={this._getOptionList.bind(this)}
              defaultValue={this.state.numWeeks}
              onSelect={this._numWeeks.bind(this)}>
              {weekChoices}
            </Select>
            <View style={{ height: 20 }}></View>
            <OptionList ref="OPTIONLIST"/>
          </View>
        </View>
        <Text style={styles.subtitle}>{ selectedUserName+"'s "}Progess:</Text>
        <View style={styles.picContainer}>
          {pictures}
          {bubbles}
        </View>
        <View style = {styles.mainPicContainer}>
          {(this.state.showImage) ? <Image source={{ uri: this.state.url }} style={styles.mainPic} /> : null}
        </View>
      </View>
    );
  }

  render() {
    return this.renderPicsView();
  }

}

export default ProgressPics;
