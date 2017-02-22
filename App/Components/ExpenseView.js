import React, { Component } from 'react'
import { View, Text } from 'react-native'
import Moment from 'moment'
import { ListItem } from 'react-native-elements'

import styles from './Styles/ExpenseView.style.js'

export default class ExpenseView extends Component {
  render () {
    let { id, date, description, amount, comment } = this.props.expense

    let dateText = Moment(date).format('DD/MM/YY  HH:mm')

    return (
      <ListItem
        key={id}
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
