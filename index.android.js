/**
 * Initial screen, hosting the application main menu where the user selects
 * a bus endpoint.
 * @see https://github.com/Mazuh/InfoBusUFRN-App
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ActivityIndicator
} from 'react-native';


export default class InfoBusUFRN extends Component {

  constructor(){
    super();
    this.state = {
      isLoading: true
    }
  }



  componentDidMount() {

    const updateErrorHandler = (error) => {
      console.error(error);
      this.setState({
        isLoading: false
      });
    };

    fetch(DATA_GIST_ENDPOINT).then((response) => {
      response.json().then((gist) =>{
        const gistContent = JSON.parse(gist.files['infobus_data.json'].content);

        // TODO

        this.setState({
          isLoading: false,
          lastUpdate: undefined
        })

      }).catch(updateErrorHandler);
    }).catch(updateErrorHandler);

  }



  render() {

    if (this.state.isLoading)

      return (
        <View style={styles.container}>
          <Text style={styles.title}>
            InfoBus UFRN.
          </Text>
          <Text style={styles.body}>
            Verificando atualizações...
          </Text>
          <ActivityIndicator/>
        </View>
      );

    else

      return (
        <View style={styles.container}>
          <Text style={styles.title}>
            InfoBus UFRN.
          </Text>
          <Text style={styles.body}>
            Pronto.
          </Text>
        </View>
      );

  }


}

const DATA_GIST_ENDPOINT = 'https://api.github.com/gists/e10c07f1abb580c143557d8ed8427bbd';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  body: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('InfoBusUFRN', () => InfoBusUFRN);
