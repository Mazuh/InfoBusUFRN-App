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

const DATA_GIST_ENDPOINT = 'https://api.github.com/gists/e10c07f1abb580c143557d8ed8427bbd';

export default class InfoBusUFRN extends Component {

  constructor(){
    super();
    this.state = {
      isLoading: true,
      error: undefined,
      data: undefined
    }
  }

  componentDidMount() {

    fetch(DATA_GIST_ENDPOINT).then((response) => {
      response.json().then((gist) =>{
        const gistContent = JSON.parse(gist.files['infobus_data.json'].content);

        // TODO

        this.setState({
          isLoading: false,
          error: false,
          data: "Tudo certo!"
        })

      }).catch((error) => {
        this.setState({
          isLoading: false,
          error: error,
          data: null
        })
      });
    }).catch((error) => {
      this.setState({
        isLoading: false,
        error: error,
        data: null
      });
    });

  }

  render() {

    if (this.state.isLoading){
      return (
        <View style={styles.container}>
          <Text style={styles.welcome}>
            InfoBus UFRN.
          </Text>
          <Text style={styles.instructions}>
            Verificando atualizações...
          </Text>
          <ActivityIndicator/>
        </View>
      );
    } else {

      if (this.state.error){

        return (
          <View style={styles.container}>
            <Text style={styles.welcome}>
              Ops...
            </Text>
            <Text style={styles.instructions}>
              Ocorreu um erro: {this.state.error}
            </Text>
          </View>
        );

      } else {

        return (
          <View style={styles.container}>
            <Text style={styles.welcome}>
              Pronto!
            </Text>
            <Text style={styles.instructions}>
              ({this.state.data})
            </Text>

            <Text style={styles.instructions}>
              O InfoBus UFRN está atualizado.
            </Text>
          </View>
        );

      }

    }

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
