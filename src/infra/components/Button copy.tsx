import { FC } from 'react'
import { Pressable, Text, PressableProps, StyleSheet, ViewStyle } from 'react-native'

import { useTheme } from '../hooks'

export const Button: FC = () => {
  const { s } = useTheme()

  return (
    <Pressable {...props}>
      <Text style={s.textBlack}>{title}</Text>
    </Pressable>
  )
}
