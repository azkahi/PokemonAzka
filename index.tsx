import 'react-native-gesture-handler'
import 'react-native-reanimated'

import { registerRootComponent } from 'expo'
import React from 'react'
import { View, Text } from 'react-native'
import { RecoilRoot } from 'recoil'

import { AppLoading } from './src/infra/components'
import { Navigation } from './src/infra/navigation'
import { SafeAreaProvider } from './src/infra/providers'
import { ColorSchemeProvider } from './src/infra/providers/ColorSchemeProvider'

const LoadingSuspense = (): JSX.Element => {
  return (
    <View>
      <Text>Loading</Text>
    </View>
  )
}

const App = (): JSX.Element => {
  return (
    <SafeAreaProvider>
      <React.Suspense fallback={<LoadingSuspense />}>
        <RecoilRoot>
          <AppLoading>
            <ColorSchemeProvider>
              <Navigation />
            </ColorSchemeProvider>
          </AppLoading>
        </RecoilRoot>
      </React.Suspense>
    </SafeAreaProvider>
  )
}

registerRootComponent(App)

export default App
