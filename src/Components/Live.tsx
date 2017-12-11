import * as React from 'react'
import {
  View,
  Text,
  ActivityIndicator,
  PermissionStatus,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import { Foundation } from '@expo/vector-icons'
import { purple, white, baseStyle } from '../utils'

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
      status: 'granted',
      direction: ''
    }
  }
  askPermission() {

  }
  render() {
    const { status, coords, direction } = this.state
    switch (status) {
      case null:
        return (
          <ActivityIndicator style={{ marginTop: 30 }} />
        )
      case 'denied':
        return (
          <View style={baseStyle.center}>
            <Foundation name="alert" size={50} />
            <Text>
              You have denied this app access to location-services.
              You can fix this in the settings on your device.
            </Text>
          </View>
        )
      case 'undetermined':
        return (
          <View style={baseStyle.center}>
            <Foundation name="alert" size={50} />
            <Text>You need to enable location-services for this app.</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={this.askPermission}
            >
              <Text style={styles.buttonText}>Enable</Text>
            </TouchableOpacity>
          </View>
        )
      default:
        return (
          <View style={styles.container}>
            <View style={styles.directionContainer}>
              <Text style={styles.header}>
                You're heading
              </Text>
              <Text style={styles.direction}>North</Text>
            </View>
            <View style={styles.metricContainer}>
              <View style={styles.metric}>
                <Text style={[styles.header, { color: white }]}>
                  Altitude:
                </Text>
                <Text style={[styles.subHeader, { color: white }]}>
                  {200} Feet
                </Text>
              </View>
              <View style={styles.metric}>
                <Text style={[styles.header, { color: white }]}>
                  Speed:
                </Text>
                <Text style={[styles.subHeader, { color: white }]}>
                  {300} MPH
                </Text>
              </View>
            </View>
          </View>
        )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  button: {
    padding: 10,
    backgroundColor: purple,
    alignSelf: 'center',
    borderRadius: 5,
    margin: 20,
  },
  buttonText: {
    color: white,
    fontSize: 20,
  },
  directionContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    fontSize: 35,
    textAlign: 'center',
  },
  direction: {
    color: purple,
    fontSize: 120,
    textAlign: 'center',
  },
  metricContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: purple,
  },
  metric: {
    flex: 1,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  subHeader: {
    fontSize: 25,
    textAlign: 'center',
    marginTop: 5,
  },
})
