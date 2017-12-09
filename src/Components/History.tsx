import * as React from 'react'
import { View, Text } from 'react-native'
import { connect, Dispatch } from 'react-redux'
import { recieveEntries, addEntry, EntriesA } from '../actions'
import { StoreState, Entry, } from '../store'
import {
  timeToString,
  getDailyReminderValue,
  fetchCalendarResults,
  DailyReminder,

} from '../utils'
import UdacifitnessCalendar from 'udacifitness-calendar'

class HistoryC extends React.Component<IConnectProps> {
  componentDidMount() {
    this.props.getEntries()
  }
  renderItem = (entry: Entry | DailyReminder, formattedDate: string, key: string) => {
    const today = (entry as DailyReminder).today
    return (
      <View>
        {today ? (
          <Text>{JSON.stringify(today)}</Text>
        ) : <Text>{JSON.stringify(entry)}</Text>}
      </View>
    )
  }
  renderEmptyDate = (formattedDate: string, key: string) => {
    return (
      <View>
        <Text>No data for this day</Text>
      </View>
    )
  }
  render() {
    const { entries } = this.props
    return (
      <UdacifitnessCalendar
        {...{
          items: entries,
          renderItem: this.renderItem,
          renderEmptyDate: this.renderEmptyDate
        }}
      />
    )
  }
}

const connectCreator = connect(
  ({ entries }: StoreState) => {
    return {
      entries
    }
  },
  (dispatch: Dispatch<{}>) => {
    return {
      addEntry: (entry: { [s: string]: Entry | DailyReminder }) => {
        return dispatch(addEntry(entry))
      },
      getEntries: () => {
        return fetchCalendarResults()
          .then(entries => dispatch(recieveEntries(entries)))
          .then(action => {
            const key = timeToString()
            if (action.type === EntriesA.recieve && !action.entries[(key)]) {
              dispatch(
                addEntry({
                  [key]: getDailyReminderValue()
                })
              )
            }
          })
      },
    }
  },
)
type IConnectProps = typeof connectCreator.allProps
export const History = connectCreator(HistoryC)
