import React, { Component } from 'react'
import { Scene, Router } from 'react-native-router-flux'

// Containers
import LoginContainer from '../Components/LoginView.js'
import ExpensesList from '../Components/ExpensesList.js'

export default class NavigationRouter extends Component {
  render () {
    return (
      <Router>
        <Scene key='login' component={LoginContainer} hideNavBar />
        <Scene key='expensesList' component={ExpensesList} title='Expenses' initial />
      </Router>
    )
  }
}
