import 'react-native'
import React from 'react'
import WeekView from '../../../App/Components/Expenses/WeekView.js'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

let data = [{
  _id: 'adsflkja',
  date: new Date(2000, 1, 1),
  description: 'description',
  amount: 99.00,
  comment: 'Some long comment'
}]

it('renders correctly', () => {
  const tree = renderer.create(
    <WeekView data={data} week={4} />
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
