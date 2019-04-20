import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { fetchDepartures } from '../actions/bus-departures';
import BusEndpointSelector from '../components/BusEndpointSelector';

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
      <View>
        <ScrollView>
          <View>
            <Text>InfoBus UFRN App</Text>
            <BusEndpointSelector/>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // todo
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchDepartures,
}, dispatch);

export default connect(null, mapDispatchToProps)(HomeScreen);
