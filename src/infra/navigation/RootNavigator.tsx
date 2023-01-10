import { createStackNavigator } from '@react-navigation/stack'
import { FC } from 'react'

import { HomeScreen } from '../screens'

const { Navigator, Screen } = createStackNavigator<RootStackParamList>()

export const RootNavigator: FC = () => {
  return (
    <Navigator>
      <Screen name="Pokemon List" component={HomeScreen} options={{ headerShown: false }} />
    </Navigator>
  )
}
