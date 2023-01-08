import { FC } from 'react'
import { Pressable, Text, PressableProps, StyleSheet, ViewStyle } from 'react-native'

import { useTheme } from '../hooks'

type ButtonProps = PressableProps & {
  title: string
  style?: ViewStyle
}

export const Button: FC<ButtonProps> = ({ children, style, title, ...props }) => {
  const { s } = useTheme()

  return (
    <Pressable {...props}>
      <Text style={s.textBlack}>{title}</Text>
    </Pressable>
  )
}
