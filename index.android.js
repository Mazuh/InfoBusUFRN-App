/**
 * TODO
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ActivityIndicator
} from 'react-native';

const url = 'https://facebook.github.io/react-native/movies.json';

export default class InfoBusUFRN extends Component {

  constructor(){
    super();
    this.state = {
      isLoading: true,
      error: null,
      data: null
    }
  }

  componentDidMount() {

    fetch(url).then((response) => {
      return response.json().then((json) =>{
        this.setState({
          isLoading: false,
          error: false,
          data: json
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
              ({this.state.data.description})
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
