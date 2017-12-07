import * as React from 'react'
import { View, Text } from 'react-native'
import { MetricI } from '../utils'

interface Props extends MetricI {
  value: number
  onIncrement: () => any
  onDecrement: () => any
}

export function UdaciStepper (props: Props) {
  return (
      <View>
      <Text>UdaciStepper</Text>
      </View>
  )
}
