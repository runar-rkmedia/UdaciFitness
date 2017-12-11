import * as React from 'react'
import { View, Text, ActivityIndicator, PermissionStatus } from 'react-native'

interface Props {
}

interface State {
  coords: {
    x: number,
    y: number
  } | null
  status: PermissionStatus | null | 'undetermined'
  direction: string
}

export class Live extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      coords: null,
      status: null,
      direction: ''
    }
  }
  render() {
    const { status, coords, direction } = this.state
    switch (status) {
      case null:
        return (
          <ActivityIndicator style={{marginTop: 30}}/>
        )
      case 'denied':
        return (
          <View><Text>Denied</Text></View>
        )
      case 'undetermined':
        return (
          <View><Text>undetermined</Text></View>
        )
      default:
        return (
          <View>
            <Text>Live</Text>
            <Text>{JSON.stringify(this.state)}</Text>
          </View>
        )
    }
  }
}
