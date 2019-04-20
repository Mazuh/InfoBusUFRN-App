import React from 'react';
import { connect } from 'react-redux';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View>
        <ScrollView>
          <View>
            <Text>Hello world!</Text>
            <Text>{JSON.stringify(this.props)}</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // todo
});

const mapStateToProps = state => ({ busDepartures: state });

export default connect(mapStateToProps)(HomeScreen);
