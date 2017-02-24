import faker from 'faker'
import Moment from 'moment'

import store from '../../Model/MainStore.js'

export function generateExpense () {
  return {
    owner: store.userDevice.userId,
    date: Moment(faker.date.past()).valueOf(),
    description: faker.company.catchPhraseDescriptor(),
    amount: faker.finance.amount(),
    comment: faker.lorem.sentence()
  }
}
