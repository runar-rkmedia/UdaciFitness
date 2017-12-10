import React from 'react'
import { View, Text } from 'react-native'
import { NavigationScreenConfigProps } from 'react-navigation'

interface Props {}

interface State {}

type CProps = NavigationScreenConfigProps & Props
export class EntryDetail extends React.Component<CProps, State> {
  render() {
    return (
      <View>
        <Text>Entry Detail – {this.props.navigation.state.params.entryID}</Text>
      </View>
    )
  }
}
