import 'react-native'
import React from 'react'
import FilterView from '../../../App/Components/Expenses/FilterView.js'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

it('renders correctly', () => {
  const tree = renderer.create(
    <FilterView />
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
