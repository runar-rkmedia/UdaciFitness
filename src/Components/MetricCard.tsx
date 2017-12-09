import * as React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { DateHeader, } from './'
import { Entry } from '../store'
import { metricMetaInfo, gray, DailyReminder } from '../utils'

interface Props {
  date: string,
  metrics: Entry | DailyReminder
}

export function MetricCard({ date, metrics }: Props) {
  return (
    <View>
      {date && <DateHeader dateString={date} />}
      {Object.keys(metrics).map(metric => {
        const { getIcon, displayName, unit, backgroundColor } = metricMetaInfo[metric]
        return (
          <View key={metric} style={style.metric}>
            {getIcon()}
            <View>
              <Text style={{ fontSize: 20 }}>{displayName}</Text>
              <Text style={{ fontSize: 16, color: gray }}>
                {metrics[metric]}&thinsp;{unit}
              </Text>
            </View>
          </View>
        )
      })}
    </View>
  )
}

const style = StyleSheet.create({
  metric: {
    flexDirection: 'row',
    marginTop: 12,
  }
})
