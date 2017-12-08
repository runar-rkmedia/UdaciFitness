import * as React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { gray } from '../utils'

export function MetricCount({ value, unit }: { value: number, unit: string }) {
  return (
    <View style={style.metricCount}>
      <Text style={{ fontSize: 24, textAlign: 'center' }}>{value}</Text>
      <Text style={{ fontSize: 24, color: gray }}>{unit}</Text>
    </View>
  )
}
const style = StyleSheet.create({
  metricCount: {
    width: 85,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
