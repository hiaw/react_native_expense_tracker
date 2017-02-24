import React, { Component } from 'react'
import { Alert, View, TextInput, Button } from 'react-native'
import { observable, computed } from 'mobx'
import { observer } from 'mobx-react'
import { Actions } from 'react-native-router-flux'
import * as firebase from 'firebase'
import Spinner from 'react-native-loading-spinner-overlay'

import spinnerStyle from '../Styles/SpinnerStyle.js'
import styles from './LoginView.style.js'

import SelectUsersButton from './SelectUsersButton.js'
/* import { registerUser } from './RegisterUser.js'*/

import store from '../../Model/MainStore.js'

@observer
export default class LoginUserForm extends Component {
  @observable loading = false
  @observable registering = false
  @observable loginEmail = ''
  @observable loginPassword = ''

  @computed get loadingText() {
    return this.registering? 'Registering ...' : 'Logging in ...'
  }
  @computed get buttonText() {
    return this.registering? 'Register' : 'Login'
  }
  @computed get alternateButtonText() {
    return this.registering? 'Already Registered?' : 'Not yet registered?'
  }

  registerUser(email, password) {
    var userData = {email, password};

    this.props.app.service('users').create(userData).then((result) => {
      this.props.app.authenticate({
        type: 'local',
        email: email,
        password: password
      }).then(response => {
        this.setState({ loading: false });
        // re-route to main authorized chat   component
        Actions.expense();
      }).catch(error => {
        console.log(error);
        Alert.alert('Error', 'Please enter a valid email or password.');
        this.setState({ loading: false });
      });
    }).catch((err) => {
      console.log('err');
      console.log(err);
      self.setState({loading: false});
      Alert.alert('Error', err.message);
    });
  }

  submit () {
    this.loading = true
    if (this.registering) {
      this.registerUser(this.loginEmail, this.loginPassword)
     } else{
      firebase.auth()
        .signInWithEmailAndPassword(this.loginEmail, this.loginPassword)
        .then(res => {
          store.userDevice.userId = res.uid
          this.loading = false
          Actions.usersList()
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
  setEmailPassword (email, password) {
    this.loginEmail = email
    this.loginPassword = password
    this.registering = false
  }

  render () {
    if (this.loading) {
      return <Spinner visible textContent={this.loadingText}
        textStyle={spinnerStyle} />
    } else {
      return this.renderMain()
    }
  }

  renderMain () {
    return (
      <View style={styles.container}>
        <SelectUsersButton setEmailPassword={this.setEmailPassword.bind(this)} />

        <TextInput
          style={styles.textInput}
          placeholder='Email'
          defaultValue={this.loginEmail}
          onChangeText={(value) => { this.loginEmail = value }}
        />
        <TextInput
          style={styles.textInput}
          placeholder='Password'
          defaultValue={this.loginPassword}
          onChangeText={(value) => { this.loginPassword = value }}
          secureTextEntry
        />
        <Button
          onPress={() => this.submit()}
          title={this.buttonText}
        />
        <Button
          onPress={() => { this.registering = !this.registering }}
          title={this.alternateButtonText}
        />
      </View>
    )
  }
}

