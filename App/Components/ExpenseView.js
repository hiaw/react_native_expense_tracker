import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'
import { observable, computed } from 'mobx'
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

    let userMobilePath = '/user/' + store.userDevice.userId
      + '/expenses/' + props.expense.key
    this.expensesRef = firebase.database().ref(userMobilePath)
  }

  save() {
    console.log('saving')
  }

  delete() {
    console.log('deleting')
  }

  render () {
    let dateText = Moment(this.date).format('DD/MM/YY')
    let timeText = Moment(this.date).format('HH:mm')

    return (
      <View style={styles.container}>
        <FormLabel>Date</FormLabel>
        <FormInput value={dateText}/>

        <FormLabel>Time</FormLabel>
        <FormInput value={timeText}/>

        <FormLabel>Amount</FormLabel>
        <FormInput value={this.amount}/>

        <FormLabel>Description</FormLabel>
        <FormInput value={this.description}/>

        <FormLabel>Comment</FormLabel>
        <FormInput value={this.comment}/>

        <Button title='Save'
          onPress={() => this.save()} />
        <Button title='Delete'
          color='red'
          onPress={() => this.delete()} />
      </View>
    )
  }
}
