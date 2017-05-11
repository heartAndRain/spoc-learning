import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import App from './built/app'

export default class SpocLearning extends Component {
  render() {
    return (
      <App></App>
    );
  }
}
AppRegistry.registerComponent('SpocLearning', () => SpocLearning);
