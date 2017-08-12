/**
 * Initial screen, hosting the application main menu where the user selects
 * a bus endpoint.
 * @see https://github.com/Mazuh/InfoBusUFRN-App
 */

import React, { Component, } from 'react';
import {
  View,
  Text,
  Button,
  AppRegistry,
  StyleSheet,
  ActivityIndicator,
  AsyncStorage,
} from 'react-native';
import { StackNavigator, } from 'react-navigation';


if (!__DEV__) {
  console.log = () => {};
  console.error = () => {};
}


export class EndpointSelection extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'InfoBus UFRN'
  });


  constructor(props){
    super(props);
    this.state = {
      isLoading: true
    }
  }



  componentDidMount() {

    // exception handlers

    const updateErrorHandler = (error) => {
      console.error(error);
      this.setState({
        isLoading: false
      });
    };

    const updateErrorHandlerWithoutStateSet = (error) => {
      console.error(error);
    };

    const dataNotFoundErrorHandler = (error) => {
      console.error('FATAL: ' + error);
      this.setState({
        isLoading: false,
        fatalErrorMessage: 'Não conseguiu encontrar horários do Circular: ' + error
      });
    };

    // updating routine

    fetch(DATA_GIST_ENDPOINT).then((httpResponse) => { // try to download new data and store it
      httpResponse.json().then((gistResponse) =>{

        const gistData = JSON.parse(gistResponse.files['infobus_data.json'].content);

        AsyncStorage.setItem(DATA_STORE_KEY, JSON.stringify(gistData)).then(async () => {
          console.log('Stored a new data on ' + DATA_STORE_KEY);

        }).catch(updateErrorHandlerWithoutStateSet); // chill... it's OK if
      }).catch(updateErrorHandlerWithoutStateSet); // you just can't
    }).catch(updateErrorHandlerWithoutStateSet) // update from internet now
    .then(() => {

      AsyncStorage.getItem(DATA_STORE_KEY).then(async (gistData) => {
        if (gistData){
          console.log('Loaded data from ' + DATA_STORE_KEY);

          this.setState({
            isLoading: false,
            data: JSON.parse(gistData)
          });

          let needsToUpdateFromAppStore = true;
          this.state.data.meta.supportedMobileVersions.forEach((supportedVersion) => {
            if (THIS_APP_VERSION == supportedVersion){
              needsToUpdateFromAppStore = false;
            }
          });
          if (needsToUpdateFromAppStore){
            // TODO: give hyperlink for the damn user who can't (and won't) ask for it!
            dataNotFoundErrorHandler('A versão do seu app do InfoBus UFRN é muuuito antiga. Atualize na Google Play!');
          }
        } else {
          console.error('Data not found on ' + DATA_STORE_KEY);
          dataNotFoundErrorHandler('Conecte-se à Internet pelo menos uma única vez para baixar os horários.');
        }

      }).catch(dataNotFoundErrorHandler); // NOT OK if there's NO data at all!

    });

  }



  render() {
    const { navigate } = this.props.navigation;

    if (this.state.isLoading){

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

    } else {

      if (this.state.fatalErrorMessage){
        return (
          <View style={styles.container}>
            <Text style={styles.title}>
              Opa. Que vergonha! =(
            </Text>
            <Text style={styles.body}>
              {this.state.fatalErrorMessage}
            </Text>
          </View>
        );

      } else{
        return (
          <View style={styles.container}>
            <Text style={styles.title}>
              Pronto!
            </Text>
            <Text style={styles.body}>
              Aqui deverá ser selecionado o terminal.
            </Text>
            <Text style={styles.body}>
              {this.state.data.content.mobileMessage.title}
            </Text>
            <Button title="Próxima tela!" onPress={() => navigate('EndpointSchedules')} />
          </View>
        );
      }

    }

  }


}



export class EndpointSchedules extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'InfoBus UFRN'
  });

  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Olá, mundo!
        </Text>
        <Text style={styles.body}>
          Aqui serão listados os horários do terminal selecionado.
        </Text>
      </View>
    );
  }
}


const DATA_GIST_ENDPOINT = 'https://api.github.com/gists/e10c07f1abb580c143557d8ed8427bbd';
const DATA_STORE_KEY = '@InfoBusUFRN:data';
const THIS_APP_VERSION = '2.0.0';

const InfoBusUFRN = StackNavigator({
  EndpointSelection: { screen: EndpointSelection },
  EndpointSchedules: { screen: EndpointSchedules }
});

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

export default InfoBusUFRN;
AppRegistry.registerComponent('InfoBusUFRN', () => InfoBusUFRN);
