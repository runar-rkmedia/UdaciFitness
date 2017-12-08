import * as React from 'react'
import { View, Slider, StyleSheet } from 'react-native'
import { MetricI, baseStyle } from '../utils/'
import { MetricCount } from './MetricCount'
interface Props extends MetricI {
  value: number
  onChange: (v: number) => any
}

export function UdaciSlider({ max, value, unit, onChange, step }: Props) {
  return (
    <View style={baseStyle.row}>
      <Slider
        style={{ flex: 1 }}
        {...{
          value,
          step,
          minimumValue: 0,
          maximumValue: max,
          onValueChange: onChange
        }}
      />
      <MetricCount {...{ value, unit }} />
    </View>
  )
}

const style = StyleSheet.create({

})
