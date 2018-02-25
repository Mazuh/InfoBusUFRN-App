import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { retrieveAllSchedules } from './src/services/gist';

const DATA_GIST_ENDPOINT = 'https://gist.githubusercontent.com/Mazuh/e10c07f1abb580c143557d8ed8427bbd/raw/2a227ea93d5ea6bb06210dbc5bfb896f737a71ea/infobus_data.json';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    retrieveAllSchedules(DATA_GIST_ENDPOINT)
      .then((data) => {
        this.setState({
          gist_data: JSON.stringify(data)
        });
      });   
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.gist_data}</Text>
      </View>
    );
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
