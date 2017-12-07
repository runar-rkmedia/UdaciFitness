import * as React from 'react'
import { Provider } from 'react-redux'
import { store } from './store'
import { View } from 'react-native'
import { AddEntry } from './Containers/AddEntry'

export default class Main extends React.Component<{}> {
  render() {
    return (
      <Provider store={store}>
        <View>
          <AddEntry/>
        </View>
      </Provider>
    )
  }
}
