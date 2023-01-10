import { StyleSheet, View, Dimensions } from 'react-native'

const windowWidth = Dimensions.get('window').width

const width = 50

export const Triangle = ({ style }) => {
  return <View style={[styles.triangle, style]} />
}

const styles = StyleSheet.create({
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: width / 2,
    borderRightWidth: width / 2,
    borderBottomWidth: width,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#0075BE',
  },
})
