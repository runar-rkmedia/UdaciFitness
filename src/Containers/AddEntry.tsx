import * as React from 'react'
import { View, Text } from 'react-native'
import {
  MetricT,
  metricMetaInfo,
  MetricType,
  removeEntry,
  submitEntry,
  timeToString
} from '../utils'
import { UdaciSlider, UdaciStepper, DateHeader, TextBtn } from '../Components'
import { Ionicons } from '@expo/vector-icons'

interface State {
  run: number
  sleep: number
  bike: number
  swim: number
  eat: number
}

const initialState = {
  run: 0,
  sleep: 0,
  bike: 0,
  swim: 0,
  eat: 0,
}

interface Props {
  alreadyLogged: boolean
}

export class AddEntry extends React.Component<Props, State> {
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
    // const entry = this.state

    // Update Redux

    this.setState(initialState)

    // Navigate to home

    removeEntry(key)

    // Clear local notifications
  }
  submit = () => {
    const key = timeToString()
    const entry = this.state

    // Update Redux

    this.setState(initialState)

    // Navigate to home

    submitEntry({ key, entry })

    // Clear local notifications
  }
  render() {
    if (this.props.alreadyLogged) {
      return (
        <View>
          <Ionicons name="ios-happy-outline" size={100} />
          <Text>You already logged your information for today</Text>
          <TextBtn onPress={this.reset}>Reset</TextBtn>
        </View>
      )
    }
    return (
      <View>
        <DateHeader date={(new Date())} />
        {Object.keys(metricMetaInfo).map((key) => {
          const metric = metricMetaInfo[(key as MetricT)]
          const { getIcon, type } = metric
          const value = this.state[key]

          return (
            <View key={key}>
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
