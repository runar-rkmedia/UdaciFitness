import React from 'react'
import { View, StyleSheet } from 'react-native'
import { FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import { red, orange, blue, lightPurp, pink, white } from './'

export interface DailyReminder {
  today: string
}

export function getDailyReminderValue(): DailyReminder {
  return {
    today: `👋 Don"t forget to log your data today!`
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
