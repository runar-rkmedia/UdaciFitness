import * as React from 'react'
import {
  View,
  Text,
  ActivityIndicator,
  PermissionStatus,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native'
import { Foundation } from '@expo/vector-icons'
import { purple, white, baseStyle } from '../utils'
import { Location, Permissions } from 'expo'
import { calculateDirection } from '../utils'

interface Props {
}

interface State {
  locationData: Location.LocationData | null
  status: PermissionStatus | null | 'undetermined'
  direction: string,
  bounceValue: Animated.Value
}

export class Live extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      locationData: null,
      status: 'granted',
      direction: '',
      bounceValue: new Animated.Value(1)
    }
  }
  componentDidMount() {
    Permissions.getAsync(Permissions.LOCATION)
      .then(({ status }: Permissions.PermissionResponse) => {
        if (status === 'granted') {
          return this.setLocation()
        }
        this.setState(() => ({ status }))
      })
      .catch(({ error }) => {
        console.warn('Error getting Location permission: ', error)
        this.setState(() => ({ status: 'undetermined' }))
      })
  }

  askPermission = () => {
    Permissions.askAsync(Permissions.LOCATION)
      .then(({ status }: Permissions.PermissionResponse) => {
        switch (status) {
          case 'granted':
            return this.setLocation()
          default:
            return this.setState(() => ({ status }))
        }
      })
      .catch((error) => {
        console.warn('Error asking Location permission: ', error)
      })
  }
  setLocation = () => {
    Location.watchPositionAsync(
      {
        enableHighAccuracy: true,
        timeInterval: 1,
        distanceInterval: 1,
      },
      (locationData: Location.LocationData) => {
        const newDirection = calculateDirection(locationData.coords.heading)
        const { direction, bounceValue } = this.state

        if (newDirection !== direction) {
          Animated.sequence([
            Animated.timing(bounceValue, { duration: 200, toValue: 1.04 }),
            Animated.spring(bounceValue, { friction: 4, toValue: 1 })
          ]).start()
        }

        this.setState(() => ({
          locationData,
          status: 'granted',
          direction: newDirection
        }))
      }
    )
  }
  render() {
    const { status, locationData, direction, bounceValue } = this.state
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
        if (!locationData) {
          return (
            <View>
              <Text>Waiting for locationdata...</Text>
            </View>
          )
        }
        return (
          <View style={styles.container}>
            <View style={styles.directionContainer}>
              <Text style={styles.header}>
                You're heading
              </Text>
              <Animated.Text
                style={[
                  styles.direction,
                  {
                    transform: [{ scale: bounceValue}],
                  },
                ]}
              >{direction}
              </Animated.Text>
            </View>
            <View style={styles.metricContainer}>
              <View style={styles.metric}>
                <Text style={[styles.header, { color: white }]}>
                  Altitude:
                </Text>
                <Text style={[styles.subHeader, { color: white }]}>
                  {Math.round(locationData.coords.altitude)} meters
                </Text>
              </View>
              <View style={styles.metric}>
                <Text style={[styles.header, { color: white }]}>
                  Speed:
                </Text>
                <Text style={[styles.subHeader, { color: white }]}>
                  {(locationData.coords.speed / 1000 * 60 * 60).toFixed(1)} KPH
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
