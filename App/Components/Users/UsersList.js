import React, { Component } from 'react'
import { View, ListView, Button } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { ListItem } from 'react-native-elements'

import styles from './UsersList.style.js'

export default class UsersList extends Component {

  constructor (props) {
    super(props)

    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })
    }

    this.userService = props.app.service('users')

    this.updateList()

    this.userService.on('created', user => {
      this.updateList()
    })
    this.userService.on('removed', user => {
      this.updateList()
    })
    this.userService.on('updated', user => {
      this.updateList()
    })
    this.userService.on('patched', user => {
      this.updateList()
    })
  }

  updateList () {
    this.userService.find().then(users => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(users.data)
      })
    })
  }

  _renderUser (user) {
    return <ListItem title={user.email}
      onPress={() => { Actions.user({user}) }} />
  }

  render () {
    return (
      <View style={styles.container}>
        <ListView dataSource={this.state.dataSource}
          enableEmptySections
          renderRow={(user) => this._renderUser(user)} />

        <View style={{backgroundColor: 'lightblue'}}>
          <Button onPress={() => { Actions.user() }}
            title='Add User' />
        </View>
      </View>
    )
  }
}
