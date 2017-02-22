import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Actions } from 'react-native-router-flux'
import * as firebase from 'firebase'

import styles from './Styles/ExpensesList.style.js'

import ExpenseView from './ExpenseView.js'

let expense = {
  date: new Date(),
  description: 'Nulla facilisis, risus a rhoncus fermentum, tellus tellus lacinia purus, et dictum nunc justo sit amet elit.  ',
  amount: Math.round(10000 * Math.random()) / 100,
  comment: 'Suspendisse potenti.  '
}

export default class ExpensesList extends Component {
  render () {
    return (
      <View style={styles.container}>
        <ExpenseView expense={expense} />
        <ExpenseView expense={expense} />
        <ExpenseView expense={expense} />
        <ExpenseView expense={expense} />
        <ExpenseView expense={expense} />
        <ExpenseView expense={expense} />
        <ExpenseView expense={expense} />
        <ExpenseView expense={expense} />
        <ExpenseView expense={expense} />
        <ExpenseView expense={expense} />
      </View>
    )
  }
}

