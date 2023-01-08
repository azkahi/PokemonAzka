import * as SplashScreen from 'expo-splash-screen'
import React, { FC, Fragment, useEffect } from 'react'

interface Props {
  children: React.ReactNode
}

export const AppLoading: FC<Props> = ({ children }) => {
  useEffect(() => {
    SplashScreen.hideAsync()
  }, [])

  return <Fragment>{children}</Fragment>
}
