import * as React from 'react'
import {
  View,
 } from 'react-native'
import { AddEntry } from './Containers/AddEntry'

export default class Main extends React.Component<{}> {
  render() {
    return (
      <View>
        <AddEntry alreadyLogged={false}/>
      </View>
    )
  }
}
