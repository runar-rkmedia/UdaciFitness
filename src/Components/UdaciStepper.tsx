import * as React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { MetricI, black } from '../utils'

interface Props extends MetricI {
  value: number
  onIncrement: () => any
  onDecrement: () => any
}

const iconProps = {
  color: black,
  size: 5
}

export function UdaciStepper(
  { max, value, unit, onIncrement, onDecrement, step }: Props) {
  return (
    <View>
      <View>
        <TouchableOpacity onPress={onDecrement}>
          <FontAwesome name="minus" {...iconProps} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onIncrement}>
          <FontAwesome name="plus" {...iconProps} />
        </TouchableOpacity>
      </View>
      <View>
        <Text>{value}</Text>
        <Text>{unit}</Text>
      </View>
    </View>
  )
}
