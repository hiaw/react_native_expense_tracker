import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Actions } from 'react-native-router-flux'
import * as firebase from 'firebase'

import styles from './Styles/ExpensesList.style.js'

export default class ExpensesList extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Text>Expense List</Text>
        <Text>Expense List</Text>
        <Text>Expense List</Text>
        <Text>Expense List</Text>
        <Text>Expense List</Text>
        <Text>Expense List</Text>
        <Text>Expense List</Text>
        <Text>Expense List</Text>
        <Text>Expense List</Text>
        <Text>Expense List</Text>
      </View>
    )
  }
}

