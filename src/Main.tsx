import * as React from 'react'
import { Provider } from 'react-redux'
import { store } from './store'
import { View } from 'react-native'
import { AddEntry } from './Containers/'
import { History } from './Components/'

export default class Main extends React.Component<{}> {
  render() {
    return (
      <Provider store={store}>
        <View style={{flex: 1, paddingTop: 20}}>
          <History/>
          <AddEntry/>
        </View>
      </Provider>
    )
  }
}
