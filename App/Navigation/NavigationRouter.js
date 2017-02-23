import React, { Component } from 'react'
import { Scene, Router } from 'react-native-router-flux'

// Containers
import LoginContainer from '../Components/Login/LoginView.js'
import ExpensesList from '../Components/Expenses/ExpensesList.js'
import ExpenseView from '../Components/Expenses/ExpenseView.js'
import UsersList from '../Components/Users/UsersList.js'

export default class NavigationRouter extends Component {
  render () {
    return (
      <Router>
        <Scene key='login' component={LoginContainer} hideNavBar />
        <Scene key='expensesList' component={ExpensesList} title='Expenses' hideNavBar={false} />
        <Scene key='expense' component={ExpenseView} title='Expense' hideNavBar={false} />
        <Scene key='usersList' component={UsersList} title='Users' hideNavBar={false} />
      </Router>
    )
  }
}
