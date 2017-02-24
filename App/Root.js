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
    this.setState({ loading: true })

    this.app.io.on('connect', () => {
      this.setState({ connected: true })

      this.app.authenticate().then(() => {
        this.setState({ loading: false })
        Actions.expense()
      }).catch(error => {
        this.setState({ loading: false })
        console.log('not logged in')
        console.log(error)
        Actions.login()
      })
    })

    this.app.io.on('disconnect', () => {
      this.setState({ connected: false })
      Actions.offline()
    })
  }

  render () {
    return (
      <NavigationRouter app={this.app} />
    )
  }
}

