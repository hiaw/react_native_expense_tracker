import React, { Component } from 'react'
import { View, ListView, Text, Button } from 'react-native'
import * as firebase from 'firebase'

import { generateExpense } from './ExpenseGenerator.js'
import ExpenseRowView from './ExpenseRowView.js'

import styles from './Styles/ExpensesList.style.js'
import store from '../Model/MainStore.js'

export default class ExpensesList extends Component {

  constructor () {
    super()

    let userMobilePath = '/user/' + store.userDevice.userId + '/expenses'
    this.expensesRef = firebase.database().ref(userMobilePath)

    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })
    }
  }

  componentDidMount () {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows([generateExpense()])
    })
    /* this.listenForExpenses(this.expensesRef) */
  }

  listenForExpenses (expensesRef) {
    expensesRef.on('value', (snap) => {
      // get children as an array
      var expenses = []
      snap.forEach((child) => {
        expenses.push({
          date: child.val().date,
          description: child.val().description,
          amount: child.val().amount,
          comment: child.val().comment,
          key: child.key
        })
      })

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(expenses)
      })
    })
  }

  generateExpensesForUser () {
    let ref = this.expensesRef.push()
    ref.set(generateExpense())
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

        <Button onPress={() => this.generateExpensesForUser()}
          title='Generate Expenses For User' />
      </View>
    )
  }
}

