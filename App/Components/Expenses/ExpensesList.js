import React, { Component } from 'react'
import { View, ListView, Button } from 'react-native'
import { Actions } from 'react-native-router-flux'
import _ from 'lodash'

import { generateExpense } from './ExpenseGenerator.js'
import ExpenseRowView from './ExpenseRowView.js'

import styles from './ExpensesList.style.js'
import store from '../../Model/MainStore.js'

export default class ExpensesList extends Component {

  updateList (q) {
    let decreasingDate = {$sort: {date: -1}}
    let newQ = _.merge(q, {query: decreasingDate})

    this.expenseService.find(newQ)
      .then(expenses => {
        console.log(expenses)
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(expenses.data)
        })
      })
  }

  constructor (props) {
    super(props)

    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })
    }

    this.expenseService = props.app.service('expenses')

    this.updateList()

    this.expenseService.on('created', expense => {
      this.updateList()
    })
    this.expenseService.on('removed', expense => {
      this.updateList()
    })
    this.expenseService.on('updated', expense => {
      this.updateList()
    })
    this.expenseService.on('patched', expense => {
      this.updateList()
    })
  }

  addExpense () {
    Actions.expense()
  }

  generateExpensesForUser () {
    this.expenseService.create(generateExpense())
  }

  generateQuery (minAmount, maxAmount) {
    let q = {}
    if (minAmount) q = _.merge(q, { amount: { $gte: minAmount } })
    if (maxAmount) q = _.merge(q, { amount: { $lte: maxAmount } })
    return { query: q }
  }

  openFilter () {
    let q = this.generateQuery(null, 70)
    this.updateList(q)
  }

  _renderExpense (expense) {
    return (
      <ExpenseRowView expense={expense} />
    )
  }

  render () {
    return (
      <View style={styles.container}>
        <Button onPress={() => this.openFilter()}
          title='Filter' />
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

