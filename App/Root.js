import * as firebase from 'firebase'

let config = {
  apiKey: 'AIzaSyB6c11heoJLaykfX9MJe5GnEY1oN3j4ASs',
  authDomain: 'toptal-dc-expense-tracker.firebaseapp.com',
  databaseURL: 'https://toptal-dc-expense-tracker.firebaseio.com',
  storageBucket: 'toptal-dc-expense-tracker.appspot.com',
  messagingSenderId: '265807090139'
}
firebase.initializeApp(config)

import React, { Component } from 'react'
import {StyleSheet, Text, View} from 'react-native'

export default class Root extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
})
