import * as React from 'react'
import { Text } from 'react-native'
import { purple } from '../utils'

interface Props {
  date?: Date
  dateString?: string
}

export function DateHeader({ date, dateString }: Props) {
  return (
    <Text style={{color: purple, fontSize: 25}} >{dateString ? dateString : date!.toLocaleDateString()}</Text>
  )
}
