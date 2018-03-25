import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import actions from '../actions';
import { allEndpointsReferences } from '../lib/gist_data_parser';
import { DATA_GIST_ENDPOINT } from '../constants/gist';
import { retrieveFullDataObject } from '../services/gist';

class Home extends React.Component {
  componentDidMount() {
    retrieveFullDataObject().then((gistObj) => {
      const { dispatch } = this.props;
      const { setEndpointsReferences } = actions;
      dispatch(setEndpointsReferences(allEndpointsReferences(gistObj)));
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.props.endpointsReferences || 'NA'}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function mapStateToProps(state) {
  return {
    endpointsReferences: state.endpoints.endpointsReferences
  };
}

export default connect(mapStateToProps)(Home);
