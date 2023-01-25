import AsyncStorage from '@react-native-async-storage/async-storage'
import { AtomEffect, DefaultValue } from 'recoil'

export default function persistAtom<T>(key: string): AtomEffect<T> {
  return ({ setSelf, onSet }) => {
    setSelf(
      AsyncStorage.getItem(key).then(
        (savedValue) => (savedValue != null ? JSON.parse(savedValue) : new DefaultValue()) // Abort initialization if no value was stored
      )
    )

    // Subscribe to state changes and persist them to localForage
    onSet((newValue, _, isReset) => {
      if (isReset) {
        AsyncStorage.removeItem(key)
      } else {
        AsyncStorage.setItem(key, JSON.stringify(newValue))
      }
    })
  }
}
