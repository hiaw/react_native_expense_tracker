import React, { Component } from 'react'
import { Alert, View, Button, DatePickerIOS } from 'react-native'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import Moment from 'moment'
import { FormLabel, FormInput } from 'react-native-elements'
import { Actions } from 'react-native-router-flux'

import store from '../../Model/MainStore.js'
import styles from './ExpenseView.style.js'

@observer
export default class ExpenseView extends Component {
  @observable editing = false
  @observable date = new Date()
  @observable description = ''
  @observable amount = ''
  @observable comment = ''

  constructor (props) {
    super(props)

    this.expenseService = props.app.service('expenses')

    if (props.expense) {
      this.editing = true
      this.date = Moment(props.expense.date).toDate()
      this.description = props.expense.description
      this.amount = props.expense.amount
      this.comment = props.expense.comment
    }
  }

  add() {
    this.expenseService.create({
      owner: store.userDevice.userId,
      date: this.date,
      description: this.description,
      amount: Number(this.amount),
      comment: this.comment
    }).then((res) => {
      Actions.pop()
    })
  }

  save () {
    this.expenseService.update(this.props.expense._id, {
      owner: this.props.expense.owner,
      date: this.date,
      description: this.description,
      amount: Number(this.amount),
      comment: this.comment
    }).then((res) => {
      Actions.pop()
    })
  }

  delete () {
    Alert.alert(
      'Delete this expense',
      'Are you sure?',
      [
        {text: 'Yes', onPress: () => {
          this.expenseService.remove(this.props.expense._id)
            .then((res) => {
              Actions.pop()
            })
        }},
        {text: 'Cancel', onPress: () => {}, style: 'cancel'}
      ]
    )
  }

  render () {
    let dateText = Moment(this.date).format('DD/MM/YY')
    let timeText = Moment(this.date).format('HH:mm')

    return (
      <View style={styles.container}>
        <FormLabel>Date</FormLabel>
        <DatePickerIOS
          date={this.date}
          mode="datetime"
          onDateChange={(t) => { this.date = t }}
        />

        <FormLabel>Amount</FormLabel>
        <FormInput value={this.amount.toString()}
          keyboardType='numeric'
          onChangeText={(t) => {this.amount = t}}/>

        <FormLabel>Description</FormLabel>
        <FormInput value={this.description}
          onChangeText={(t) => {this.description= t}}/>

        <FormLabel>Comment</FormLabel>
        <FormInput value={this.comment}
          inputStyle={{height: 100}}
          multiline={true}
          numberOfLines={4}
          onChangeText={(t) => {this.comment= t}}/>

        { this.editing? this.renderEditButtons(): this.renderAddButton()}

      </View>
    )
  }

  renderAddButton() {
    return (
      <Button title='Add'
        onPress={() => this.add()} />
    )
  }

  renderEditButtons() {
    return (
      <View>
        <Button title='Save'
          onPress={() => this.save()} />
        <Button title='Delete'
          color='red'
          onPress={() => this.delete()} />
      </View>
    )
  }
}
