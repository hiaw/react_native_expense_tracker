import React, { Component } from 'react'
import { View, TextInput, Button } from 'react-native'
import { observable, computed } from 'mobx'
import { observer } from 'mobx-react'
import { Actions } from 'react-native-router-flux'
import * as firebase from 'firebase'
import Spinner from 'react-native-loading-spinner-overlay'

import spinnerStyle from './Styles/SpinnerStyle.js'
import styles from './Styles/LoginView.style.js'

import store from '../Model/MainStore.js'

@observer
export default class LoginUserForm extends Component {
  @observable loading = false
  @observable registering = false
  @observable loginEmail = 'test@test.com'
  @observable loginPassword = '123456'

  @computed get loadingText() {
    return this.registering? 'Registering ...' : 'Logging in ...'
  }
  @computed get buttonText() {
    return this.registering? 'Register' : 'Login'
  }
  @computed get alternateButtonText() {
    return this.registering? 'Already Registered?' : 'Not yet registered?'
  }

  submit () {
    this.loading = true
    if (this.registering) {
      firebase.auth()
        .createUserWithEmailAndPassword(this.loginEmail, this.loginPassword)
        .then(res => {
          store.userDevice.userId = res.uid
          this.loading = false
          Actions.expensesList()
        })
        .catch(error =>{
          this.loading = false
          console.log(error.toString())
        })
    } else {
      firebase.auth()
        .signInWithEmailAndPassword(this.loginEmail, this.loginPassword)
        .then(res => {
          store.userDevice.userId = res.uid
          this.loading = false
          Actions.expensesList()
        })
        .catch(error => {
          this.loading = false
          console.log(error.toString())
        })
    }
  }

  /* logout() {
   *   firebase.auth().signOut()
   *     .catch(error => {
   *       console.log(error);
   *     })
   * }
   */
  render () {
    if (this.loading) {
      return <Spinner visible textContent={this.loadingText}
        textStyle={spinnerStyle} />
    } else {
      return this.renderMain()
    }
  }

  renderMain() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          placeholder='Email'
          defaultValue={this.loginEmail}
          onChangeText={(value) => this.loginEmail = value}
        />
        <TextInput
          style={styles.textInput}
          placeholder='Password'
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

