import * as React from 'react'
import { View, Text, Slider } from 'react-native'
import { MetricI } from '../utils/helpers'

interface Props extends MetricI {
  value: number
  onChange: (v: number) => any
}

export function UdaciSlider({ max, value, unit, onChange, step }: Props) {
  return (
    <View>
      <Slider
        {...{
          value,
          step,
          minimumValue: 0,
          maximumValue: max,
          onValueChange: onChange
        }}
      />
      <Text>{value}</Text>
      <Text>{unit}</Text>
    </View>
  )
}
