import { NavigationContainer, NavigationState } from '@react-navigation/native'
import { FC } from 'react'

import { StatusBar } from '../components'
import { RootNavigator } from './RootNavigator'

export const Navigation: FC = () => {

  return (
    <>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </>
  )
}
