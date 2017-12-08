import * as React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { FontAwesome, Entypo } from '@expo/vector-icons'
import { MetricI, jssOS, OS, white, purple, baseStyle } from '../utils'
import { MetricCount } from './MetricCount'

interface Props extends MetricI {
  value: number
  onIncrement: () => any
  onDecrement: () => any
}

const iconProps = {
  color: OS({ ios: purple, android: white }),
  size: 35
}

export function UdaciStepper(
  { max, value, unit, onIncrement, onDecrement, step }: Props) {
  return (
    <View style={[baseStyle.row, { justifyContent: 'space-between' }]}>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          style={[style.btn, { borderTopRightRadius: 0, borderBottomRightRadius: 0 }]}
          onPress={onDecrement}
        >
          {OS({
            ios: (<Entypo name="minus" {...iconProps} />),
            android: (<FontAwesome name="minus" {...iconProps} />)
          })}
        </TouchableOpacity>
        <TouchableOpacity
          style={[style.btn, { marginLeft: -3, borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }]}
          onPress={onIncrement}
        >
          {OS({
            ios: (<Entypo name="plus" {...iconProps} />),
            android: (<FontAwesome name="plus" {...iconProps} />)
          })}
        </TouchableOpacity>
      </View>
      <MetricCount {...{value, unit}} />
    </View>
  )
}

const style = StyleSheet.create({
  btn: jssOS({
    ios: {
      backgroundColor: white,
      borderColor: purple,
      borderWidth: 3,
      borderRadius: 3,
      padding: 5,
      paddingLeft: 25,
      paddingRight: 25,
    },
    android: {
      backgroundColor: purple,
      margin: 5,
      padding: 10,
      borderRadius: 2
    }
  }
  ),
})
