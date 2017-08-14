/**
 * @see https://github.com/Mazuh/InfoBusUFRN-App
 */

import React, { Component, } from 'react';
import {
  View,
  Text,
  Image,
  TouchableHighlight,
  FlatList,
  AppRegistry,
  StyleSheet,
  ActivityIndicator,
  AsyncStorage,
  ToastAndroid,
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

    if (this.state.isLoading){

      return (
        <View style={styles.container}>
          <Image source={require('./infobus_icon.png')}/>
          <Text style={styles.title}>
            Dirrocha?
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
              Inge, boy... Que vergonha! =(
            </Text>
            <Text style={styles.body}>
              {this.state.fatalErrorMessage}
            </Text>
          </View>
        );

      } else{

        const busEndpoints = this.state.data.content.busEndpoints;

        let endpoints = [];
        busEndpoints.forEach((busEndpoint) => {
          endpoints.push({'key': busEndpoint.reference});
        });

        const mobileUpdateWarning = this.state.data.content.mobileUpdateWarning;
        const mobileMessage = this.state.data.content.mobileMessage;

        let msgTitle = '';
        let msgContent = '';
        if (mobileUpdateWarning.mostUpdatedVersion != THIS_APP_VERSION){
          msgTitle = 'Hã?! Seu InfoBus parece estar desatualizado!';
          msgContent = mobileUpdateWarning.warningForOutdatedUsers;
        } else if (mobileMessage.isAnEmergency || (Math.floor(Math.random() * 10) < 3)){
          msgTitle = mobileMessage.title;
          msgContent = mobileMessage.body;
        }

        return (
          <View style={styles.container}>
            <Text style={styles.title}>
              Cadê tu?
            </Text>
            <View style={styles.listcontainer}>
              <FlatList
                style={styles.list}
                data={endpoints}
                renderItem={({item}) =>
                  <TouchableHighlight
                    style={styles.libtncontainer}
                    onPress={() => {
                      this.props.navigation.navigate(
                        'EndpointSchedules',
                        {
                          selectedReference: item.key,
                          busEndpoints: busEndpoints,
                        }
                      )
                    }}>
                    <Text style={styles.libtntext}>{item.key}</Text>
                  </TouchableHighlight>
                }
                ItemSeparatorComponent={() =>
                  <Text style={styles.liseparator}></Text>
                } />
            </View>
            <Text style={styles.subtitle}>{msgTitle}</Text>
            <Text style={styles.body}>{msgContent}</Text>
          </View>
        );

      }

    }

  }


}



export class EndpointSchedules extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'InfoBus UFRN: Horários'
  });


  constructor(props){
    super(props);

    const selectedReference = this.props.navigation.state.params.selectedReference;
    const busEndpoints = this.props.navigation.state.params.busEndpoints;

    busEndpoints.forEach((busEndpoint) => {
      if (busEndpoint.reference == selectedReference){
        // current UTC time
        const dtNow = new Date();
        const today = dtNow.getUTCDay();
        let now = {
          hours: dtNow.getUTCHours(),
          minutes: dtNow.getUTCMinutes(),
        };

        // set a constant time zone for current time
        now.hours -= 3; // RN-Brazil
        if (now.hours < 0){
          now.hours = 24 + now.hours;
        }

        // stringify current time
        const nowStr = (now.hours < 10 ? '0'+now.hours : now.hours)
                     + ':'
                     + (now.minutes < 10 ? '0'+now.minutes : now.minutes);

        // find departure times suggestions
        let suggestions = [];
        busEndpoint.buses.forEach((bus) => {
          bus.departures.some((departure, i, departures) => {
            let h = departure.time.substring(0, 2);
            let m = departure.time.substring(3, 5);
            if ((h > now.hours) || (h == now.hours && m >= now.minutes)){
              if (bus.days.split('').some((day) => { return (day == today); })){
                suggestions.push({
                  key: bus.line,
                  last: !i ? null : departures[i-1].time,
                  next1: departure.time,
                  next2: i == departures.length-1 ? null : departures[i+1].time,
                });
                return true;
              }
            } else{
              return false;
            }
          });
        });

        const hasHiddenBusSuggestions = busEndpoint.buses.length != suggestions.length;

        this.state = {
          selectedReference: selectedReference,
          localTime: nowStr,
          suggestions: suggestions,
          hasHiddenBusSuggestions: hasHiddenBusSuggestions,
        };
      }
    });


  }


  render(){
    let hiddenBusMsg = '';
    if (this.state.hasHiddenBusSuggestions){
      hiddenBusMsg = 'Um ou mais linhas foram ocultas da lista por não terem mais horário agendados hoje.';
      hiddenBusMsg += ' Possíveis motivos: acabou a noite; não é dia letivo; ou é algum final de semana.';
    } else{
      if (Math.floor(Math.random() * 10) < 4){ // 40% of chance to show this tip
        hiddenBusMsg = '(Dica: meta uma dedada num horário pra ver quanto tempo falta.)';
      }
    }

    const showTimeDiff = (time) => {
      const dtNow = new Date();
      const nowMinutes = dtNow.getUTCHours()*60 + dtNow.getUTCMinutes() - 180;
      if (nowMinutes < 0){
        ToastAndroid.show('Foi mal, tá muito cedo pra calcular isso ainda...', ToastAndroid.SHORT);
      } else{
        const timeMinutes = Number(time.substring(0, 2))*60 + Number(time.substring(3, 5));
        const diff = timeMinutes - nowMinutes;
        if (diff > 1){
          ToastAndroid.show('Faltam ' + diff + ' minutos pra dar ' + time + '.', ToastAndroid.SHORT);
        } else if (diff >= -1){
          ToastAndroid.show('Esse de ' + time + ' deve(ria) estar saindo AGORA ou já se foi.', ToastAndroid.SHORT);
        } else{
          ToastAndroid.show('Esse de ' + time + ' deve(ria) ter saído há ' + Math.abs(diff) + ' minutos.', ToastAndroid.SHORT);
        }
      }
    };

    return (
      <View style={styles.container}>
        <Text style={styles.titlecolored}>
          {this.state.selectedReference}
        </Text>
        <Text style={styles.body}>
          Deu pra arranjar {this.state.suggestions.length} linha(s) às {this.state.localTime}h.
        </Text>
        <FlatList
          data={this.state.suggestions}
          renderItem={({item}) =>
            <View>
              <Text style={styles.subtitlecolored}>
                {item.key}
              </Text>
              <Text style={styles.subtitle}
                onPress={() => showTimeDiff(item.last)}>
                {item.last}
              </Text>
              <Text style={styles.title}
                onPress={() => showTimeDiff(item.next1)}>
                {item.next1}
              </Text>
              <Text style={styles.subtitle}
                onPress={() => showTimeDiff(item.next2)}>
                {item.next2}
              </Text>
            </View>
          }
          ItemSeparatorComponent={() =>
            <Text style={styles.liseparator}></Text>
          }
        />
        <Text style={styles.body}>{hiddenBusMsg}</Text>
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
    fontSize: 27,
    textAlign: 'center',
    margin: 8,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 25,
    textAlign: 'center',
    margin: 0,
  },
  titlecolored: {
    fontSize: 27,
    textAlign: 'center',
    margin: 8,
    color: '#3F51B5',
    fontWeight: 'bold',
  },
  subtitlecolored: {
    fontSize: 25,
    textAlign: 'center',
    margin: 0,
    color: '#3F51B5',
  },
  body: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  listcontainer: {
    height: 200,
    //backgroundColor: 'black',
  },
  list: {
  },
  libtncontainer: {
    backgroundColor: '#3F51B5',
  },
  libtntext: {
    color: 'white',
    fontSize: 23,
    margin: 10,
  },
  liseparator: {
    margin: 5,
  },
});

export default InfoBusUFRN;
AppRegistry.registerComponent('InfoBusUFRN', () => InfoBusUFRN);
