import * as React from 'react'
import { View, Text } from 'react-native'
import { MetricI } from '../utils/helpers'

interface Props extends MetricI {
  value: number
  onChange: (v: number) => any
}

export function UdaciSlider (props: Props) {
  return (
      <View>
      <Text>Udacislider</Text>
      </View>
  )
}
