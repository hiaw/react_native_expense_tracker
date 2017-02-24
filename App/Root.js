import React, { Component } from 'react'
import { AsyncStorage } from 'react-native'
import NavigationRouter from './Navigation/NavigationRouter.js'
import { Actions } from 'react-native-router-flux'
/* import * as firebase from 'firebase' */

import feathers from 'feathers/client'
import hooks from 'feathers-hooks'
import socketio from 'feathers-socketio/client'
import authentication from 'feathers-authentication/client'

import io from 'socket.io-client'

export default class Root extends Component {
  constructor () {
    super()

    const options = {transports: ['websocket'], forceNew: true}
    const socket = io('http://localhost:3030', options)

    this.app = feathers()
      .configure(socketio(socket))
      .configure(hooks())
      // Use AsyncStorage to store our login token
      .configure(authentication({
        storage: AsyncStorage
      }))
  }

  componentDidMount () {
    this.app.io.on('connect', () => {
      this.app.authenticate().then(() => {
        Actions.expense()
      }).catch(error => {
        console.log(error)
        Actions.login()
      })
    })

    this.app.io.on('disconnect', () => {
      Actions.login()
    })
  }

  render () {
    return (
      <NavigationRouter app={this.app} />
    )
  }
}

