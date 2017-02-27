import faker from 'faker'

import store from '../../Model/MainStore.js'

export function generateExpense () {
  return {
    owner: store.userDevice.userId,
    date: faker.date.past(),
    description: faker.company.catchPhraseDescriptor(),
    amount: Math.round(10000 * Math.random()) / 100,
    comment: faker.lorem.sentence()
  }
}
