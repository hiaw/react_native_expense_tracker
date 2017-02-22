import React, { Component } from 'react'
import { View, Text } from 'react-native'
import Moment from 'moment'

import styles from './Styles/ExpenseView.js'

/* date, time, description, amount, comment. */

export default class ExpenseView extends Component {
  render () {
    let { date, description, amount, comment } = this.props.expense
    let dateText = Moment(date).format('DD/MM/YY HH:mm')
    return (
      <View>
        <Text>{dateText}</Text>
        <Text>{description}</Text>
        <Text>{amount}</Text>
        <Text>{comment}</Text>
      </View>
    )
  }
}
