import React, { Component } from 'react'
import { View, ListView, Text, Button } from 'react-native'
import * as firebase from 'firebase'
import { Actions } from 'react-native-router-flux'
import { ListItem } from 'react-native-elements'

import styles from './UsersList.style.js'

export default class UsersList extends Component {

  constructor () {
    super()

    console.log('constructing users list')

    let userMobilePath = '/users'
    this.usersRef = firebase.database().ref(userMobilePath)

    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })
    }
  }

  componentDidMount () {
    /* this.setState({
     *   dataSource: this.state.dataSource.cloneWithRows([generateUser()])
     * }) */
    this.listenForUsers(this.usersRef)
  }

  listenForUsers (usersRef) {
    usersRef.on('value', (snap) => {
      // get children as an array
      var users = []
      snap.forEach((child) => {
        users.push({
          email: child.val().email,
          key: child.key
        })
      })

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(users)
      })
    })
  }

  _renderUser (user) {
    return <ListItem title={user.email} />
  }

  render () {
    return (
      <View style={styles.container}>
        <ListView dataSource={this.state.dataSource}
          enableEmptySections
          renderRow={(user) => this._renderUser(user)} />
      </View>
    )
  }
}
