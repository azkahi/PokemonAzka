import { createStackNavigator } from '@react-navigation/stack'
import { FC } from 'react'

import { HomeScreen, DetailScreen } from '../screens'

const { Navigator, Screen } = createStackNavigator()

export const RootNavigator: FC = () => {
  return (
    <Navigator>
      <Screen name="Pokemon List" component={HomeScreen} options={{ headerShown: false }} />
      <Screen name="Pokemon Detail" component={DetailScreen} options={{ headerShown: false }} />
    </Navigator>
  )
}
