import React, { Component } from 'react'
import { View, ListView, Text, Button } from 'react-native'
import { Actions } from 'react-native-router-flux'

import { generateExpense } from './ExpenseGenerator.js'
import ExpenseRowView from './ExpenseRowView.js'

import styles from './ExpensesList.style.js'
import store from '../../Model/MainStore.js'

export default class ExpensesList extends Component {

  constructor (props) {
    super(props)

    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })
    }

    this.expenseService = props.app.service('expenses')

    this.expenseService.find().then(expenses => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(expenses.data)
      })
    })
  }

  addExpense () {
    Actions.expense()
  }

  generateExpensesForUser () {
    this.expenseService.create(generateExpense())
  }

  _renderExpense (expense) {
    return (
      <ExpenseRowView expense={expense} />
    )
  }

  render () {
    return (
      <View style={styles.container}>
        <ListView dataSource={this.state.dataSource}
          enableEmptySections
          renderRow={(expense) => this._renderExpense(expense)} />

        <Button onPress={() => this.addExpense()}
          title='Add Expense' />
        <Button onPress={() => this.generateExpensesForUser()}
          title='Generate Expenses For User' />
      </View>
    )
  }
}

