/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class InfoBusUFRN extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Olá, mundo!
        </Text>
        <Text style={styles.instructions}>
          Já comecei editando o arquivo index.android.js.
          Depois de um quase dois dias preparando o ambiente!
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('InfoBusUFRN', () => InfoBusUFRN);
