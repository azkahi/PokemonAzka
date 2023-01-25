import { NavigationContainer } from '@react-navigation/native'
import { FC } from 'react'

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
