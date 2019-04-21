import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { selectReference } from '../actions/bus-departures';
import { BLACK, DARKER_WHITE } from '../constants/colors';

const BusEndpointSelector = ({ busEndpoints = [], selectReference }) => (
  <View>
    <Text style={styles.title}>Cadê tu?</Text>
    {busEndpoints.map(({ reference }) => (
      <TouchableOpacity
        style={styles.button}
        key={reference}
        onPress={() => selectReference(reference)}
      >
        <Text style={styles.buttonText}>{reference}</Text>
      </TouchableOpacity>
    ))}
  </View>
);

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 15,
    color: '#fff',
  },
  button: {
    paddingTop: 15,
    paddingBottom: 15,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: DARKER_WHITE,
  },
  buttonText: {
    color: BLACK,
    fontSize: 18,
    textAlign: 'center',
  },
});

const mapStateToProps = state => ({ busEndpoints: state.busEndpoints });
const mapDispatchToProps = dispatch => bindActionCreators({ selectReference }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(BusEndpointSelector);
