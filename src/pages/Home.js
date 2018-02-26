import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import actions from '../actions';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(actions.fetchEndpointsReferences());
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
