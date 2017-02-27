import 'react-native'
import React from 'react'
import ExpenseRowView from '../../../App/Components/Expenses/ExpenseRowView.js'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

let expense = {
  _id: 'adsflkja',
  date: new Date(2000, 1, 1),
  description: 'description',
  amount: 99.00,
  comment: 'Some long comment'
}

it('renders correctly', () => {
  const tree = renderer.create(
    <ExpenseRowView expense={expense} />
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
