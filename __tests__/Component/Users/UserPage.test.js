import 'react-native'
import React from 'react'
import UserPage from '../../../App/Components/Users/UserPage.js'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

let user = {
  _id: 'adsflkja',
  email: 'test@test.com',
  roles: ['admin']
}

let app = { service: () => {}}

it('renders correctly', () => {
  const tree = renderer.create(
    <UserPage user={user} app={app} />
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
