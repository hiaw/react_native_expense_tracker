import React, { Component } from 'react'
import { Scene, Router } from 'react-native-router-flux'

// Containers
import LoginContainer from '../Components/Login/LoginView.js'
import ExpensesList from '../Components/Expenses/ExpensesList.js'
import ExpenseView from '../Components/Expenses/ExpenseView.js'
import UsersList from '../Components/Users/UsersList.js'
import UserPage from '../Components/Users/UserPage.js'
import UsersExpensesList from '../Components/Users/UsersExpensesList.js'
import WeekView from '../Components/Expenses/WeekView.js'
import FilterView from '../Components/Expenses/FilterView.js'

export default class NavigationRouter extends Component {
  render () {
    return (
      <Router >
        <Scene app={this.props.app} key='login' component={LoginContainer} hideNavBar />
        <Scene app={this.props.app} key='expensesList' component={ExpensesList} title='Expenses' hideNavBar={false} />
        <Scene app={this.props.app} key='expense' component={ExpenseView} title='Expense' hideNavBar={false} />
        <Scene app={this.props.app} key='weekView' component={WeekView} title='Week' hideNavBar={false} />
        <Scene app={this.props.app} key='filter' component={FilterView} title='Filter' hideNavBar={false} />

        <Scene app={this.props.app} key='usersList' component={UsersList} title='Users' hideNavBar={false} />
        <Scene app={this.props.app} key='user' component={UserPage} title='User' hideNavBar={false} />
        <Scene app={this.props.app} key='userAndExpenseList' component={UsersExpensesList} hideNavBar={false} />
      </Router>
    )
  }
}
