import 'react-native-gesture-handler'
import 'react-native-reanimated'

import { registerRootComponent } from 'expo'

import { AppLoading } from './src/infra/components'
import { Navigation } from './src/infra/navigation'
import { SafeAreaProvider } from './src/infra/providers'
import { ColorSchemeProvider } from './src/infra/providers/ColorSchemeProvider'

const App = (): JSX.Element => {
  return (
    <SafeAreaProvider>
      <AppLoading>
        <ColorSchemeProvider>
          <Navigation />
        </ColorSchemeProvider>
      </AppLoading>
    </SafeAreaProvider>
  )
}

registerRootComponent(App)

export default App
