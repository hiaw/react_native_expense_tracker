import 'react-native'
import React from 'react'
import ExpenseView from '../../../App/Components/Expenses/ExpenseView.js'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

let expense = {
  _id: 'adsflkja',
  date: new Date(),
  description: 'description',
  amount: 99.00,
  comment: 'Some long comment'
}

let app = { service: () => {}}

it('renders correctly', () => {
  const tree = renderer.create(
    <ExpenseView expense={expense} app={app} />
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
