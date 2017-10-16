/**
 * @see https://github.com/Mazuh/InfoBusUFRN-App
 */

import React, { Component, } from 'react';
import {
  View,
  ScrollView,
  Text,
  Button,
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
    title: 'InfoBus UFRN',
    headerRight: (
      <TouchableHighlight onPress={() => navigation.navigate('About')}>
        <Image style={styles.headerRight} source={require('./github_icon.png')}/>
      </TouchableHighlight>
    ),
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
          msgTitle = 'Hã?! Seu InfoBus app parece estar desatualizado!';
          msgContent = mobileUpdateWarning.warningForOutdatedUsers;
        } else if (mobileMessage.isAnEmergency || (Math.floor(Math.random() * 10) < 3)){
          msgTitle = mobileMessage.title;
          msgContent = mobileMessage.body;
        }

        const titleBtnFreeForDST = undefined;
        if (this.state.hourCorrection != undefined && this.state.hourCorrection == 0){
            titleBtnFreeForDST = ">> Não. Deixe normal. <<"
        } else{
            titleBtnFreeForDST = "Não. Deixe normal."
        }
        const setFreeForDST = () => {
          this.setState((state) => {
            state.hourCorrection = 0;
            return state;
          });
        };

        const titleBtnAheadForDST = undefined;
        if (this.state.hourCorrection != undefined && this.state.hourCorrection == 1){
            titleBtnAheadForDST = ">> Sim. Adiante em 1h. <<"
        } else{
            titleBtnAheadForDST = "Sim. Adiante em 1h."
        }
        const setAheadForDST = () => {
          this.setState((state) => {
            state.hourCorrection = +1;
            return state;
          });
        };

        const titleBtnDelayForDST = undefined;
        if (this.state.hourCorrection != undefined && this.state.hourCorrection == -1){
            titleBtnDelayForDST = ">> Sim. Atrase em 1h. <<"
        } else{
            titleBtnDelayForDST = "Sim. Atrase em 1h."
        }
        const setDelayForDST = () => {
          this.setState((state) => {
            state.hourCorrection = -1;
            return state;
          });
        };

        return (
          <View style={styles.container}>
            <Text style={styles.title}>
              Cadê tu?
            </Text>
            <ScrollView style={styles.listcontainer}>
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
                          hourCorrection: this.state.hourCorrection,
                        }
                      )
                    }}>
                    <Text style={styles.libtntext}>{item.key}</Text>
                  </TouchableHighlight>
                }
                ItemSeparatorComponent={() =>
                  <Text style={styles.liseparator}></Text>
                } />

              <Text style={styles.subtitle}></Text>
              <Text style={styles.body}>O InfoBus bugou com o horário de verão?</Text>

              <Button
                onPress={setFreeForDST}
                title={titleBtnFreeForDST}
                color="#841584"
                accessibilityLabel="Não. Apenas deixar o app como está."
              />
              <Button
                onPress={setAheadForDST}
                title={titleBtnAheadForDST}
                color="#841584"
                accessibilityLabel="Sim. Acrescentar 1h ao app."
              />
              <Button
                onPress={setDelayForDST}
                title={titleBtnDelayForDST}
                color="#841584"
                accessibilityLabel="Sim. Diminuir 1h do app."
              />

              <Text style={styles.subtitle}></Text>

              <Text style={styles.subtitle}>{msgTitle}</Text>
              <Text style={styles.body}>{msgContent}</Text>

            </ScrollView>

          </View>
        );

      }

    }

  }


}



export class EndpointSchedules extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'InfoBus UFRN: Horários',
    headerRight: (
      <TouchableHighlight onPress={() => navigation.navigate('About')}>
        <Image style={styles.headerRight} source={require('./github_icon.png')}/>
      </TouchableHighlight>
    ),
  });


  constructor(props){
    super(props);

    const selectedReference = this.props.navigation.state.params.selectedReference;
    const busEndpoints = this.props.navigation.state.params.busEndpoints;
    const hourCorrection = this.props.navigation.state.params.hourCorrection == undefined
                           ? 0 : this.props.navigation.state.params.hourCorrection;

    busEndpoints.forEach((busEndpoint) => {
      if (busEndpoint.reference == selectedReference){
        // current UTC time
        const dtNow = new Date();
        const today = dtNow.getDay();
        let now = {
          hours: dtNow.getUTCHours(),
          minutes: dtNow.getUTCMinutes(),
        };

        // set a constant time zone for current time
        now.hours -= 3; // RN-Brazil
        now.hours += hourCorrection; // DST?
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
          hourCorrection: hourCorrection,
        };
      }
    });


  }


  render(){
    let hiddenBusMsg = '';
    if (this.state.hasHiddenBusSuggestions){
      hiddenBusMsg = 'Um ou mais linhas foram ocultas da lista por não terem mais horário agendados hoje.';
      hiddenBusMsg += ' Possíveis motivos: ela já deu a última viagem; não é dia letivo; ou é algum final de semana.';
    } else{
      if (Math.floor(Math.random() * 10) < 4){ // 40% of chance to show this tip
        hiddenBusMsg = '(Dica: meta uma dedada num horário pra ver quanto tempo falta.)';
      }
    }

    const showTimeDiff = (time) => {
      const dtNow = new Date();
      let nowMinutes = dtNow.getUTCHours() * 60 + dtNow.getUTCMinutes() - 180;
      nowMinutes += this.state.hourCorrection * 60;
      if (nowMinutes < 0){
        nowMinutes += (24*60);
      }

      const timeMinutes = Number(time.substring(0, 2)) * 60 + Number(time.substring(3, 5));

      const diff = timeMinutes - nowMinutes;

      if (diff > 1) {
          ToastAndroid.show('Faltam ' + diff + ' minutos pra dar ' + time + '.', ToastAndroid.SHORT);
      } else if (diff >= -1) {
          ToastAndroid.show('Esse de ' + time + ' deve(ria) estar saindo AGORA ou já se foi.', ToastAndroid.SHORT);
      } else {
          ToastAndroid.show('Esse de ' + time + ' deve(ria) ter saído há ' + Math.abs(diff) + ' minutos.', ToastAndroid.SHORT);
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


export class About extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'InfoBus UFRN: Sobre'
  });

  constructor(props){
    super(props);
  }

  render(){
    return (
      <View style={styles.container}>
        <Image source={require('./infobus_icon.png')}/>
        <Text style={styles.titlecolored}>
          InfoBus UFRN
        </Text>
        <ScrollView>
          <Text style={styles.subtitlecolored}>
            Copyright (c) 2017 "Mazuh" &lt;mazuh@ufrn.edu.br&gt;
          </Text>
          <Text style={styles.subtitle}>
            Fácil consulta aos horários de partida dos ônibus da UFRN.
          </Text>
          <Text style={styles.body}>
            Este programa é um Software Livre: você pode redistribuí-lo e/ou modificá-lo
             sob os termos da GNU General Public License v3, conforme publicado pela
             Free Software Foundation.
          </Text>
          <Text style={styles.body}>
            Você pode consultar a cópia da GNU General Public License v3
             em &lt;http://www.gnu.org/licenses/&gt;. E abrir o código-fonte no
             repositório do GitHub: &lt;https://github.com/Mazuh/InfoBusUFRN-App/&gt;.
          </Text>
          <Text style={styles.body}>
            Agradecimentos: Yuri Henrique Sales (IFRN),
             e a todos que contribuiram com feedbacks e pedidos desde antigo
             app Terminal 588.
          </Text>
        </ScrollView>
      </View>
    );
  }
}



const DATA_GIST_ENDPOINT = 'https://api.github.com/gists/e10c07f1abb580c143557d8ed8427bbd';
const DATA_STORE_KEY = '@InfoBusUFRN:data';
const THIS_APP_VERSION = '2.2.0';

const InfoBusUFRN = StackNavigator({
  EndpointSelection: { screen: EndpointSelection },
  EndpointSchedules: { screen: EndpointSchedules },
  About: { screen: About },
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
  headerRight: {
    marginRight: 3,
  },
  listcontainer: {
    height: 178,
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
