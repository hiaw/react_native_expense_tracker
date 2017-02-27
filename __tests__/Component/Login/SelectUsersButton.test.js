import 'react-native'
import React from 'react'
import SelectUsersButton from '../../../App/Components/Login/SelectUsersButton.js'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

it('renders correctly', () => {
  const tree = renderer.create(
    <SelectUsersButton />
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
