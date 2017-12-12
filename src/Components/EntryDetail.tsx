import * as React from 'react'
import { View, StyleSheet } from 'react-native'
import { NavigationScreenConfigProps } from 'react-navigation'
import { connect, Dispatch } from 'react-redux'
import { timeToString, getDailyReminderValue, white, removeEntry, DailyReminder } from '../utils/'
import { MetricCard } from './'
import { TextBtn } from './'
import { addEntry } from '../actions'
import { StoreState, Entry } from '../store'

interface Props extends NavigationScreenConfigProps {
  remove: () => any
  goBack: () => any
  entryID: string
  metrics: Entry | DailyReminder
}

class EntryDetailC extends React.Component<IConnectProps> {
  static navigationOptions = ({ navigation }: any) => {
    const { entryID } = navigation.state.params

    const year = entryID.slice(0, 4)
    const month = entryID.slice(5, 7)
    const day = entryID.slice(8)

    return {
      title: `${month}/${day}/${year}`
    }
  }
  reset = () => {
    const { remove, goBack, entryID } = this.props

    remove()
    goBack()
    removeEntry(entryID)
  }
  shouldComponentUpdate(nextProps: Props) {
    return nextProps.metrics !== null && !(nextProps.metrics as DailyReminder).today
  }
  render() {
    const { metrics, entryID } = this.props
    return (
      <View style={styles.container}>
        <MetricCard metrics={metrics} date={entryID} />
        <TextBtn btnStyle={{ margin: 20 }} onPress={this.reset}>
          RESET
        </TextBtn>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 15,
  },
})

import { } from '../actions'
const connectCreator = connect(
  (state: StoreState, { navigation }: Props) => {
    const { entryID } = navigation.state.params
    return {
      entryID,
      metrics: state.entries[entryID]
    }
  },
  (dispatch: Dispatch<{}>, { navigation }: Props) => {
    const { entryID } = navigation.state.params
    return {
      remove: () => dispatch(addEntry({
        [entryID]: timeToString() === entryID
          ? getDailyReminderValue()
          : null
      })),
      goBack: () => navigation.goBack(),
    }
  },
)
type IConnectProps = typeof connectCreator.allProps
export const EntryDetail = connectCreator(EntryDetailC)
