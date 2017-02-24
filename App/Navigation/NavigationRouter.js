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
      <Router >
        <Scene app={this.props.app} key='login' component={LoginContainer} hideNavBar />
        <Scene app={this.props.app} key='expensesList' component={ExpensesList} title='Expenses' hideNavBar={false} />
        <Scene app={this.props.app} key='expense' component={ExpenseView} title='Expense' hideNavBar={false} />
        <Scene app={this.props.app} key='usersList' component={UsersList} title='Users' hideNavBar={false} />
      </Router>
    )
  }
}
