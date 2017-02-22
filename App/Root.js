import React, { Component } from 'react'
import NavigationRouter from './Navigation/NavigationRouter.js'
import * as firebase from 'firebase'

export default class Root extends Component {
  constructor () {
    super()

    let config = {
      apiKey: 'AIzaSyB6c11heoJLaykfX9MJe5GnEY1oN3j4ASs',
      authDomain: 'toptal-dc-expense-tracker.firebaseapp.com',
      databaseURL: 'https://toptal-dc-expense-tracker.firebaseio.com',
      storageBucket: 'toptal-dc-expense-tracker.appspot.com',
      messagingSenderId: '265807090139'
    }
    firebase.initializeApp(config)
  }

  render () {
    return (
      <NavigationRouter />
    )
  }
}

