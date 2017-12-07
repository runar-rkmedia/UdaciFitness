import * as React from 'react'
import { View } from 'react-native'
import { MetricT, metricMetaInfo, MetricType } from '../utils/helpers'
import { UdaciSlider, UdaciStepper } from './'

interface State {
  run: number
  sleep: number
  bike: number
  swim: number
  eat: number
}

export class AddEntry extends React.Component<{}, State> {
  state = {
    run: 0,
    sleep: 0,
    bike: 0,
    swim: 0,
    eat: 0,
  }
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
  render() {
    return (
      <View>
        {Object.keys(metricMetaInfo).map((key) => {
          const metric = metricMetaInfo[(key as MetricT)]
          const { getIcon, type} = metric
          const value = this.state[key]

          return (
            <View key={key}>
              {getIcon()}
              {type === MetricType.slider ?
                <UdaciSlider
                  {...metric}
                  {...{value}}
                  onChange={(v) => this.slide((key as MetricT), v)}
                /> :
                <UdaciStepper
                  {...metric}
                  {...{value}}
                  onIncrement={() => this.increment((key as MetricT))}
                  onDecrement={() => this.decrement((key as MetricT))}
                />
              }

            </View>
          )
        })}
      </View>
    )
  }
}
