import UserDeviceData from './UserDeviceData.js'
import { AsyncStorage } from 'react-native'
import { create } from 'mobx-persist'

const persistStore = create({
  storage: AsyncStorage
})

let store = {
  userDevice: persistStore('userDevice', new UserDeviceData())
}

export default store
