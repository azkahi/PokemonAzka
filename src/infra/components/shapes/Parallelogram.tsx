import { StyleSheet, View, Dimensions } from 'react-native'

import { Triangle } from './Triangle'
import { TriangleDown } from './TriangleDown'

const width = 50

export const Parallelogram = ({ style, children }) => {
  return (
    <View style={[styles.parallelogram, style]}>
      <Triangle style={styles.parallelogramRight} />
      <TriangleDown style={styles.parallelogramLeft} />
      <View style={styles.parallelogramInner}>{children}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  parallelogram: {
    width: (width * 3) / 2,
    height: width * 2,
  },
  parallelogramInner: {
    position: 'absolute',
    left: 0,
    top: 0,
    borderWidth: 1,
    borderLeftColor: '#FFCC00',
    borderTopColor: '#FFCC00',
    borderRightColor: '#0075BE',
    borderBottomColor: '#0075BE',
    backgroundColor: 'white',
    width: (width * 3) / 2,
    height: width * 2,
  },
  parallelogramRight: {
    bottom: 0,
    right: (-1 * width) / 2,
    position: 'absolute',
  },
  parallelogramLeft: {
    top: 0,
    left: (-1 * width) / 2,
    position: 'absolute',
  },
})
