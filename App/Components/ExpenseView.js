import React, { Component } from 'react'
import { View, Text } from 'react-native'
import Moment from 'moment'

import styles from './Styles/ExpenseView.style.js'

export default class ExpenseView extends Component {
  render () {
    let { date, description, amount, comment } = this.props.expense

    let dateText = Moment(date).format('DD/MM/YY  HH:mm')

    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.text}>{dateText}</Text>
          <Text style={[styles.text, styles.bold]}>{description}</Text>
          <Text style={styles.text}>{amount}</Text>
        </View>
        <Text style={styles.commentText} numberOfLines={2}>{comment}</Text>
      </View>
    )
  }
}
