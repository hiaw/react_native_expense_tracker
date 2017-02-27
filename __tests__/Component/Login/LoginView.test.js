import 'react-native'
import React from 'react'
import LoginView from '../../../App/Components/Login/LoginView.js'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

it('renders correctly', () => {
  const tree = renderer.create(
    <LoginView />
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
