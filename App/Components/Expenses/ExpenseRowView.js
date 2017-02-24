import React, { Component } from 'react'
import { View, Text } from 'react-native'
import Moment from 'moment'
import { Actions } from 'react-native-router-flux'
import { ListItem } from 'react-native-elements'

import styles from './ExpenseRowView.style.js'

export default class ExpenseRowView extends Component {
  render () {
    let { _id, date, description, amount, comment } = this.props.expense

    let dateText = Moment(date).format('DD/MM/YY  HH:mm')

    return (
      <ListItem
        onPress={() => { Actions.expense({expense: this.props.expense}) }}
        key={_id}
        title={
          <View style={styles.row}>
            <Text style={styles.description}>{description}</Text>
            <Text style={styles.amount}>$ {amount}</Text>
          </View>
              }
        subtitle={
          <View style={styles.subtitle}>
            <Text style={styles.date}>{dateText}</Text>
            <Text style={styles.comment}>{comment}</Text>
          </View>
                 } />
    )
  }
}
