import React, { Component } from 'react'
import { View, Button } from 'react-native'

export default class LoginUserForm extends Component {
  render () {
    return (
      <View style={{marginBottom: 50}}>
        <Button
          onPress={() => this.props.setEmailPassword('admin@test.com', '123456')}
          title='Admin User'
        />
        <Button
          onPress={() => this.props.setEmailPassword('manager@test.com', '123456')}
          title='Manager'
        />
        <Button
          onPress={() => this.props.setEmailPassword('user1@test.com', '123456')}
          title='User 1'
        />
        <Button
          onPress={() => this.props.setEmailPassword('user2@test.com', '123456')}
          title='User 2'
        />
      </View>
    )
  }
}
