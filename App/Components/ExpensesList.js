import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Actions } from 'react-native-router-flux'
import * as firebase from 'firebase'

import { generateExpense } from './ExpenseGenerator.js'

import styles from './Styles/ExpensesList.style.js'

import ExpenseView from './ExpenseView.js'

export default class ExpensesList extends Component {
  render () {
    return (
      <View style={styles.container}>
        <ExpenseView expense={generateExpense()} />
        <ExpenseView expense={generateExpense()} />
        <ExpenseView expense={generateExpense()} />
        <ExpenseView expense={generateExpense()} />
        <ExpenseView expense={generateExpense()} />
        <ExpenseView expense={generateExpense()} />
      </View>
    )
  }
}

