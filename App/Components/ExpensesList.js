import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'
import { Actions } from 'react-native-router-flux'
import * as firebase from 'firebase'

import { generateExpense } from './ExpenseGenerator.js'

import styles from './Styles/ExpensesList.style.js'

import ExpenseView from './ExpenseView.js'

import store from '../Model/MainStore.js'

export default class ExpensesList extends Component {

  generateExpensesForUser () {
    let userMobilePath = '/user/' + store.userDevice.userId + '/expenses'
    let ref = firebase.database().ref(userMobilePath).push()

    ref.set(generateExpense())
  }

  render () {
    return (
      <View style={styles.container}>
        <Button onPress={() => this.generateExpensesForUser()}
          title='Generate Expenses For User' />
      </View>
    )
  }
}

