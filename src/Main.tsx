import * as React from 'react'
import { Provider } from 'react-redux'
import { store } from './store'
import { View, StatusBar, StatusBarProperties } from 'react-native'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { AddEntry } from './Containers/'
import { History, EntryDetail, Live } from './Components/'
import { OS, purple, white } from './utils/'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { Constants } from 'expo'

function UdaciStatusBar({ backgroundColor, ...props }: {
  backgroundColor: string
} & StatusBarProperties) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent={true} backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = TabNavigator(
  {
    History: {
      screen: History,
      navigationOptions: {
        tabBarLabel: 'History',
        tabBarIcon: ({ tintColor }: any) => (
          <Ionicons name={OS({ ios: 'ios-bookmarks', android: 'md-bookmarks' })} size={30} color={tintColor} />
        )
      },
    },
    AddEntry: {
      screen: AddEntry,
      navigationOptions: {
        tabBarLabel: 'Add Entry',
        tabBarIcon: ({ tintColor }: any) => (
          <FontAwesome name={OS({ ios: 'plus-square', android: 'plus-square' })} size={30} color={tintColor} />
        )
      },
    },
    Live: {
      screen: Live,
      navigationOptions: {
        tabBarLabel: 'Live',
        tabBarIcon: ({ tintColor }: any) => (
          <Ionicons name={OS({ ios: 'ios-speedometer', android: 'md-speedometer' })} size={30} color={tintColor} />
        )
      },
    },
  },

  {
    navigationOptions: {
    },
    tabBarOptions: {
      activeTintColor: OS({ ios: purple, android: white }),
      style: {
        height: 56,
        backgroundColor: OS({ ios: white, android: purple }),
        shadowColor: 'rgba(0,0,0,0.24)',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }
  }
)

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  },
  EntryDetail: {
    screen: EntryDetail,
    navigationOptions: {
      headerTingColor: white,
      headerStyle: {
        backgroundColor: purple
      }
    }
  },

})

export default class Main extends React.Component<{}> {
  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <UdaciStatusBar backgroundColor={purple} barStyle="light-content" />
          <MainNavigator />
        </View>
      </Provider>
    )
  }
}
