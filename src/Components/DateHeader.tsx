import * as React from 'react'
import { Text } from 'react-native'
import { purple } from '../utils'

interface Props {
  date: Date
}

export function DateHeader({ date }: Props) {
  return (
    <Text style={{color: purple, fontSize: 25}} >{date.toLocaleDateString()}</Text>
  )
}
