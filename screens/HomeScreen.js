import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { fetchDepartures } from '../actions/bus-departures';
import BusEndpointSelector from '../components/BusEndpointSelector';
import { BLUE } from '../constants/colors';

export class HomeScreen extends React.PureComponent {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.props.fetchDepartures();
  }

  render() {
    return (
      <View style={styles.screen}>
        <ScrollView>
          <BusEndpointSelector/>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flexGrow: 1,
    paddingTop: 50,
    backgroundColor: BLUE,
  },
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchDepartures,
}, dispatch);

export default connect(null, mapDispatchToProps)(HomeScreen);
