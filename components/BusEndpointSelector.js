import React from 'react';
import { connect } from 'react-redux';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const BusEndpointSelector = ({ busEndpoints = [] }) => (
  <View>
    <ScrollView>
      <View>
        {busEndpoints.map(it => (
          <Text key={it.reference}>{it.reference}</Text>
        ))}
      </View>
    </ScrollView>
  </View>
);

const mapStateToProps = state => ({ busEndpoints: state.busEndpoints });
export default connect(mapStateToProps)(BusEndpointSelector);
