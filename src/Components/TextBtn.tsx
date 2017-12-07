import * as React from 'react'
import { Text, TouchableOpacity } from 'react-native'

export function TextBtn(
  { onPress, children }: {
    onPress: () => void,
    children: any
  }) {
  return (
    <TouchableOpacity {...{onPress}}>
      <Text>{children}</Text>
    </TouchableOpacity>
  )
}
