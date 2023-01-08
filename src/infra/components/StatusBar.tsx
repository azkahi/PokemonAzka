import { StatusBar as ExpoStatusBar, StatusBarProps } from 'expo-status-bar'

export const StatusBar = (props: StatusBarProps): JSX.Element => {
  return <ExpoStatusBar animated hideTransitionAnimation="fade" style={'light'} {...props} />
}
