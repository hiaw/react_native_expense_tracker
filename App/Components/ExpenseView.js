import React, { Component } from 'react'
import { Alert, View, Button } from 'react-native'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import Moment from 'moment'
import { FormLabel, FormInput } from 'react-native-elements'
import * as firebase from 'firebase'

import store from '../Model/MainStore.js'
import styles from './Styles/ExpenseView.style.js'

@observer
export default class ExpenseView extends Component {
  @observable date = ''
  @observable description = ''
  @observable amount = ''
  @observable comment = ''
  
  constructor (props) {
    super(props)

    this.date = props.expense.date
    this.description = props.expense.description
    this.amount = props.expense.amount
    this.comment = props.expense.comment

    let userMobilePath = '/user/' + store.userDevice.userId +
       '/expenses/' + props.expense.key
    this.expenseRef = firebase.database().ref(userMobilePath)
  }

  save () {
    this.expenseRef.set({
      date: Moment(this.date).valueOf(),
      description: this.description,
      amount: this.amount,
      comment: this.comment
    })
  }

  delete () {
    Alert.alert(
      'Delete this expense',
      'Are you sure?',
      [
        {text: 'Yes', onPress: () => { this.expenseRef.remove() }},
        {text: 'Cancel', onPress: () => {}, style: 'cancel'}
      ]
    )
  }

  changeDate(date) {
    console.log(date)
  }

  changeTime(time) {
    console.log(time)
  }

  render () {
    let dateText = Moment(this.date).format('DD/MM/YY')
    let timeText = Moment(this.date).format('HH:mm')

    return (
      <View style={styles.container}>
        <FormLabel>Date</FormLabel>
        <FormInput value={dateText}
          onChangeText={(t) => {this.changeDate(t)}}/>

        <FormLabel>Time</FormLabel>
        <FormInput value={timeText}
          onChangeText={(t) => {this.changeTime(t)}}/>

        <FormLabel>Amount</FormLabel>
        <FormInput value={this.amount}
          onChangeText={(t) => {this.amount = t}}/>

        <FormLabel>Description</FormLabel>
        <FormInput value={this.description}
          onChangeText={(t) => {this.description= t}}/>

        <FormLabel>Comment</FormLabel>
        <FormInput value={this.comment}
          onChangeText={(t) => {this.comment= t}}/>

        <Button title='Save'
          onPress={() => this.save()} />
        <Button title='Delete'
          color='red'
          onPress={() => this.delete()} />
      </View>
    )
  }
}
