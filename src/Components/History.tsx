import * as React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { NavigationScreenConfigProps } from 'react-navigation'
import { connect, Dispatch } from 'react-redux'
import { recieveEntries, addEntry, EntriesA } from '../actions'
import { StoreState, Entry, } from '../store'
import { DateHeader, MetricCard } from '../Components'
import {
  timeToString,
  getDailyReminderValue,
  fetchCalendarResults,
  DailyReminder,
  white,
  OS
} from '../utils'
import UdacifitnessCalendar from 'udacifitness-calendar'
import { AppLoading } from 'expo'

interface State {
  ready: boolean
}

type CProps = NavigationScreenConfigProps & IConnectProps

class HistoryC extends React.Component<CProps, State> {
  constructor(props: CProps) {
    super(props)
    this.state = ({
      ready: false
    })
  }
  componentDidMount() {
    this.props.getEntries()
      .then(() => this.setState({ ready: true }))
  }
  renderItem = (entry: Entry | DailyReminder, formattedDate: string, key: string) => {
    const today = (entry as DailyReminder).today
    return (
      <View style={style.item}>
        {today ? (
          <View>
            <DateHeader dateString={formattedDate} />
            <Text style={style.noDataText}>{today}</Text>
          </View>
        ) :
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate(
                'EntryDetail',
                {
                  entryID: key
                }
              )
            }}
          >
            <MetricCard date={formattedDate} metrics={entry} />
          </TouchableOpacity>}
      </View>
    )
  }
  renderEmptyDate = (formattedDate: string, key: string) => {
    return (
      <View style={style.item}>
        <DateHeader dateString={formattedDate} />
        <Text style={style.noDataText}>You did not log any data on this day.</Text>
      </View>
    )
  }
  render() {
    const { entries } = this.props
    const ready = this.state.ready
    if (ready === false) {
      return <AppLoading />
    }
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

const style = StyleSheet.create({
  item: {
    backgroundColor: white,
    borderRadius: OS({ ios: 16, android: 2 }),
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0,0,0,0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    }
  },
  noDataText: {
    fontSize: 20,
    paddingTop: 20,
    paddingBottom: 20
  }
})
