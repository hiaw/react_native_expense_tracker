import faker from 'faker'

export function generateExpense () {
  return {
    id: Math.random(),
    date: faker.date.past(),
    description: faker.company.catchPhraseDescriptor(),
    amount: faker.finance.amount(),
    comment: faker.lorem.sentence()
  }
}
