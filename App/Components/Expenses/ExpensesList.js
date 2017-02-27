import React, { Component } from 'react'
import { View, Text, ListView, Button } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { ListItem } from 'react-native-elements'
import _ from 'lodash'
import Moment from 'moment'

import { generateExpense } from './ExpenseGenerator.js'
import ExpenseRowView from './ExpenseRowView.js'

import styles from './ExpensesList.style.js'
import store from '../../Model/MainStore.js'

function generateArrayByWeekOfYear (data) {
  let newData = []
  for (var expense of data) {
    let weekInYear = Moment(expense.date).isoWeek()
    if (!newData[weekInYear]) newData[weekInYear] = []
    newData[weekInYear].push(expense)
  }

  return newData
}

export default class ExpensesList extends Component {

  constructor (props) {
    super(props)

    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2
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

  updateList (q) {
    let decreasingDate = {$sort: {date: -1}}
    let newQ = _.merge(q, {query: decreasingDate})

    this.expenseService.find(newQ)
      .then(expenses => {
        this.setState({
          total: expenses.total,
          dataSource: this.state.dataSource.cloneWithRowsAndSections(generateArrayByWeekOfYear(expenses.data))
        })
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

  applyFilter (minAmount, maxAmount) {
    let q = this.generateQuery(Number(minAmount), Number(maxAmount))
    this.updateList(q)
  }

  openFilter () {
    Actions.filter({applyFilter: this.applyFilter.bind(this)})
  }

  _renderExpense (expense) {
    return (
      <ExpenseRowView expense={expense} />
    )
  }

  _renderSectionHeader (sectionData, sectionID) {
    return (
      <ListItem key={sectionID} title={`Week ${sectionID}`}
        onPress={() => { Actions.weekView({data: sectionData, week: sectionID}) }}
        containerStyle={{backgroundColor: 'beige'}} />
    )
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={{backgroundColor: 'lightblue'}}>
          <Button onPress={() => this.openFilter()}
            title='Filter' />
          <Text style={styles.total}>Total: {this.state.total} records</Text>
        </View>
        <ListView dataSource={this.state.dataSource}
          enableEmptySections
          renderSectionHeader={this._renderSectionHeader}
          renderRow={(expense) => this._renderExpense(expense)} />

        <View style={{backgroundColor: 'lightblue'}}>
          <Button onPress={() => this.addExpense()}
            title='Add Expense' />
          <Button onPress={() => this.generateExpensesForUser()}
            title='Generate Expenses For User' />
        </View>
      </View>
    )
  }
}

