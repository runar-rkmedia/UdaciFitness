import React from 'react'
import { View, StyleSheet, Platform, ViewStyle, AsyncStorage } from 'react-native'
import { FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import { red, orange, blue, lightPurp, pink, white } from './'
import { Notifications, Permissions } from 'expo'

const NOTIFICATION_KEY = 'UdaciFitness:Notifications'

export interface DailyReminder {
  today: string
}

export function getDailyReminderValue(): DailyReminder {
  return {
    today: `👋 Don"t forget to log your data today!`
  }
}

export function OS({ ios, android }: { ios: any, android: any }) {
  switch (Platform.OS) {
    case 'ios':
      return ios
    case 'android':
      return android
    default:
      return android || ios
  }
}

export function jssOS({ ios, android }: { ios: ViewStyle, android: ViewStyle }) {
  switch (Platform.OS) {
    case 'ios':
      return ios
    case 'android':
      return android
    default:
      return android || ios
  }
}

const styles = StyleSheet.create({
  iconContainer: {
    padding: 5,
    borderRadius: 8,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20
  },
})

export enum MetricType {
  stepper, slider
}

export interface MetricI {
  displayName: string,
  max: number,
  unit: 'miles' | 'km' | 'meters' | 'hours' | 'rating'
  step: number
  type: MetricType
  getIcon: () => {}
}

export type MetricT = 'run' | 'bike' | 'sleep' | 'swim' | 'eat'

export interface MetricInfoI {
  run: MetricI
  bike: MetricI
  sleep: MetricI
  swim: MetricI
  eat: MetricI
}

export const metricMetaInfo: MetricInfoI = {
  run: {
    displayName: 'Run',
    max: 50,
    unit: 'miles',
    step: 1,
    type: MetricType.stepper,
    getIcon() {
      return (
        <View style={[styles.iconContainer, { backgroundColor: red }]}>
          <MaterialIcons
            name="directions-run"
            color={white}
            size={35}
          />
        </View>
      )
    }
  },
  bike: {
    displayName: 'Bike',
    max: 100,
    unit: 'miles',
    step: 1,
    type: MetricType.stepper,
    getIcon() {
      return (
        <View style={[styles.iconContainer, { backgroundColor: orange }]}>
          <MaterialCommunityIcons
            name="bike"
            color={white}
            size={32}
          />
        </View>
      )
    }
  },
  swim: {
    displayName: 'Swim',
    max: 9900,
    unit: 'meters',
    step: 100,
    type: MetricType.stepper,
    getIcon() {
      return (
        <View style={[styles.iconContainer, { backgroundColor: blue }]}>
          <MaterialCommunityIcons
            name="swim"
            color={white}
            size={35}
          />
        </View>
      )
    }
  },
  sleep: {
    displayName: 'Sleep',
    max: 24,
    unit: 'hours',
    step: 1,
    type: MetricType.slider,
    getIcon() {
      return (
        <View style={[styles.iconContainer, { backgroundColor: lightPurp }]}>
          <FontAwesome
            name="bed"
            color={white}
            size={30}
          />
        </View>
      )
    }
  },
  eat: {
    displayName: 'Eat',
    max: 10,
    unit: 'rating',
    step: 1,
    type: MetricType.slider,
    getIcon() {
      return (
        <View style={[styles.iconContainer, { backgroundColor: pink }]}>
          <MaterialCommunityIcons
            name="food"
            color={white}
            size={35}
          />
        </View>
      )
    }
  }
}

export function isBetween(num: number, x: number, y: number) {
  if (num >= x && num <= y) {
    return true
  }

  return false
}

export function calculateDirection(heading: number) {
  let direction = ''

  if (isBetween(heading, 0, 22.5)) {
    direction = 'North'
  } else if (isBetween(heading, 22.5, 67.5)) {
    direction = 'North East'
  } else if (isBetween(heading, 67.5, 112.5)) {
    direction = 'East'
  } else if (isBetween(heading, 112.5, 157.5)) {
    direction = 'South East'
  } else if (isBetween(heading, 157.5, 202.5)) {
    direction = 'South'
  } else if (isBetween(heading, 202.5, 247.5)) {
    direction = 'South West'
  } else if (isBetween(heading, 247.5, 292.5)) {
    direction = 'West'
  } else if (isBetween(heading, 292.5, 337.5)) {
    direction = 'North West'
  } else if (isBetween(heading, 337.5, 360)) {
    direction = 'North'
  } else {
    direction = 'Calculating'
  }

  return direction
}

export function timeToString(time: number = Date.now()) {
  const date = new Date(time)
  const todayUTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  return todayUTC.toISOString().split('T')[0]
}

export const notification = {
  clear: () => {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
  },
  create: () => {
    return {
      title: 'Log your stats',
      body: `Don't forget to log your stats for today!`,
      options: OS({
        ios: {
          sound: true,
        },
        android: {
          sound: true,
          priority: 'high',
          sticky: false,
          vibrate: true
        }
      })
    }
  },
  set: () => {
    AsyncStorage.getItem(NOTIFICATION_KEY)
      .then(JSON.parse)
      .then((data) => {
        if (!data) {
          Permissions.askAsync(Permissions.NOTIFICATIONS)
            .then(({ status }: Permissions.PermissionResponse) => {
              if (status === 'granted') {
                Notifications.cancelAllScheduledNotificationsAsync()

                let tomorrow = new Date()
                tomorrow.setDate(tomorrow.getDate() + 1)
                tomorrow.setHours(20)
                tomorrow.setMinutes(0)

                Notifications.scheduleLocalNotificationAsync(
                  notification.create(),
                  {
                    time: tomorrow,
                    repeat: 'day'
                  }
                )

                AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
              }
            })
        }
      })
  }
}
