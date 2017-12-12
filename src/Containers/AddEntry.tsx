import * as React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import {
  MetricT,
  metricMetaInfo,
  MetricType,
  removeEntry,
  submitEntry,
  timeToString,
  getDailyReminderValue,
  DailyReminder,
  white,
  OS,
  baseStyle,
  notification
} from '../utils'
import { UdaciSlider, UdaciStepper, DateHeader, TextBtn } from '../Components'
import { Ionicons } from '@expo/vector-icons'
import { connect, Dispatch } from 'react-redux'
import { addEntry } from '../actions'
import { StoreState, Entry } from '../store'

const initialState = {
  run: 0,
  sleep: 0,
  bike: 0,
  swim: 0,
  eat: 0,
}
interface Props {
}
class AddEntryC extends React.Component<Props & IConnectProps, Entry> {
  state = initialState
  stepper = (metric: MetricT, inc: 1 | -1 = 1) => {
    const { max, step } = metricMetaInfo[metric]
    this.setState(state => {
      const count = state[metric] + step * inc
      return {
        ...state,
        [metric]: count > max ? max
          : count < 0 ? 0
            : count
      }
    })
  }
  increment = (metric: MetricT) => {
    this.stepper(metric)
  }
  decrement = (metric: MetricT) => {
    this.stepper(metric, -1)
  }
  slide = (metric: MetricT, value: number) => {
    this.setState(state => {
      return {
        ...state,
        [metric]: value,
      }
    })
  }
  reset = () => {
    const key = timeToString()

    this.props.addEntry({
      [key]: getDailyReminderValue()
    })

    this.setState(initialState)

    // Navigate to home

    removeEntry(key)

    // Clear local notifications
  }
  submit = () => {
    const key = timeToString()
    const entry = this.state

    this.props.addEntry({
      [key]: entry
    })

    this.setState(initialState)

    // Navigate to home

    submitEntry({ key, entry })

    notification.clear()
    .then(notification.set)
  }
  render() {
    if (this.props.alreadyLogged) {
      return (
        <View style={baseStyle.center}>
          <Ionicons
            name={OS({ ios: 'ios-happy-outline', android: 'md-happy' })}
            size={100}
          />
          <Text>You already logged your information for today</Text>
          <TextBtn
            onPress={this.reset}
            type="reset"
          >
            Reset
          </TextBtn>
        </View>
      )
    }
    return (
      <View style={style.container}>
        <DateHeader date={(new Date())} />
        {Object.keys(metricMetaInfo).map((key) => {
          const metric = metricMetaInfo[(key as MetricT)]
          const { getIcon, type } = metric
          const value = this.state[key]

          return (
            <View key={key} style={baseStyle.row}>
              {getIcon()}
              {type === MetricType.slider ?
                <UdaciSlider
                  {...metric}
                  {...{ value }}
                  onChange={(v) => this.slide((key as MetricT), v)}
                /> :
                <UdaciStepper
                  {...metric}
                  {...{ value }}
                  onIncrement={() => this.increment((key as MetricT))}
                  onDecrement={() => this.decrement((key as MetricT))}
                />
              }
            </View>
          )
        })}
        <TextBtn onPress={this.submit}>SUBMIT</TextBtn>
      </View>
    )
  }
}

const connectCreator = connect(
  ({ entries }: StoreState) => {
    const s = entries[timeToString()]
    return {
      alreadyLogged: s && !('today' in s)
    }
  },
  (dispatch: Dispatch<{}>) => {
    return {
      addEntry: (entry: { [s: string]: Entry | DailyReminder }) => {
        return dispatch(addEntry(entry))
      },
    }
  },
)
type IConnectProps = typeof connectCreator.allProps
export const AddEntry = connectCreator(AddEntryC)

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white
  }
})
