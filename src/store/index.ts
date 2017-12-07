import { createStore } from 'redux'
import { reducer } from '../reducers/'
import { composeWithDevTools } from 'remote-redux-devtools'

export const store = createStore(reducer, composeWithDevTools())

export interface Entry {
  run: number
  sleep: number
  bike: number
  swim: number
  eat: number
}

export interface StoreState {
  entries: {
    [s: string]: Entry
  }
}
