import React, { Component } from 'react'
import { View, Text, ScrollView, Button } from 'react-native'

import ExpenseRowView from './ExpenseRowView.js'

import styles from './ExpensesList.style.js'

export default class WeekView extends Component {

  print () {
    console.log('printing ')
  }

  _renderExpense (expense) {
    return (
      <ExpenseRowView key={expense._id} expense={expense} />
    )
  }

  render () {
    let expenses = this.props.data.map(this._renderExpense.bind(this))
    let total = this.props.data.reduce((acc, val) => {
      return acc + val.amount
    }, 0)
    let average = Math.round(total * 100 / 7) / 100
    return (
      <View style={styles.container}>
        <View style={{backgroundColor: 'lightblue'}}>
          <Text key='week' style={styles.total}>Week {this.props.week}</Text>
          <Text key='total' style={styles.total}>Total Amount: ${total}</Text>
          <Text key='average' style={styles.total}>Average Day Spending: ${average}</Text>
        </View>
        <ScrollView>
          {expenses}
        </ScrollView>
        <View style={{backgroundColor: 'lightblue'}}>
          <Button title='Print' onPress={this.print.bind(this)} />
        </View>
      </View>
    )
  }
}
