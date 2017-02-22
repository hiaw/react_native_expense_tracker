import React, { Component } from 'react'
import { View, TextInput, Button } from 'react-native'
import { observable, computed } from 'mobx'
import { observer } from 'mobx-react'
import { Actions } from 'react-native-router-flux'

@observer
export default class LoginUserForm extends Component {
  @observable registering = false
  @observable loginEmail = 'test@test.com'
  @observable loginPassword = '123456'

  @computed get buttonText() {
    return this.registering? 'Register' : 'Login'
  }
  @computed get alternateButtonText() {
    return this.registering? 'Already Registered?' : 'Not yet registered?'
  }

  submit () {
    if (this.registering) {
      this.props.registerUser(this.loginEmail, this.loginPassword)
        .then(res => {
          /* console.log(res)*/
          if (res.data.createUser.token) {
            let username = res.data.loginUser.user.username
            Actions.channels({title: username})
          }
        })
    } else {
      this.props.loginUser(this.loginEmail, this.loginPassword)
        .then(res => {
          /* console.log(res)*/
          if (res.data.loginUser.token) {
            let username = res.data.loginUser.user.username
            Actions.channels({title: username})
          }
        })
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          placeholder=' Email'
          defaultValue={this.loginEmail}
          onChangeText={(value) => this.loginEmail = value}
        />
        <TextInput
          style={styles.textInput}
          placeholder=' Password'
          defaultValue={this.loginPassword}
          onChangeText={(value) => this.loginPassword = value}
          secureTextEntry
        />
        <Button
          onPress={() => this.submit()}
          title={this.buttonText}
        />
        <Button
          onPress={() => this.registering = !this.registering}
          title={this.alternateButtonText}
        />
      </View>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightblue'
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginHorizontal: 10,
    paddingLeft: 10
  }
}
