import { observable } from 'mobx'
import { persist } from 'mobx-persist'

export default class UserDeviceData {
  @persist @observable userId = ''
}
