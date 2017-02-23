import { Actions } from 'react-native-router-flux'
import * as firebase from 'firebase'

import store from '../../Model/MainStore.js'

export function registerUser (email, password, setLoading) {
  firebase.auth()
  .createUserWithEmailAndPassword(email, password)
    .then(res => {
      store.userDevice.userId = res.uid
      let userMobilePath = '/users/' + res.uid
      let usersRef = firebase.database().ref(userMobilePath)
      usersRef.set({
        email: email,
        uid: res.uid
      }).then(res => {
        setLoading(false)
        Actions.usersList()
      })
    })
    .catch(error => {
      setLoading(false)
      console.log(error.toString())
    })
}
