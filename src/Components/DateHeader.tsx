import * as React from 'react'
import { Text } from 'react-native'

interface Props {
  date: Date
}

export function DateHeader({ date }: Props) {
  return (
    <Text>{date.toLocaleDateString()}</Text>
  )
}
