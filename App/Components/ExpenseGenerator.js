import faker from 'faker'
import Moment from 'moment'

export function generateExpense () {
  return {
    date: Moment(faker.date.past()).valueOf(),
    description: faker.company.catchPhraseDescriptor(),
    amount: faker.finance.amount(),
    comment: faker.lorem.sentence()
  }
}
