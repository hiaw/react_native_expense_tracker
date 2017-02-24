import React, { Component } from 'react'
import { View } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { ListItem } from 'react-native-elements'

import styles from './UsersList.style.js'

export default class UsersExpensesList extends Component {
  render () {
    let expenseText = 'My Expenses'
    if (this.props.role === 'admin') {
      expenseText = 'All Expenses'
    }

    return (
      <View style={styles.container}>
        <ListItem title='All Users'
          onPress={() => { Actions.usersList() }} />
        <ListItem title={expenseText}
          onPress={() => { Actions.expensesList() }} />
      </View>
    )
  }
}
