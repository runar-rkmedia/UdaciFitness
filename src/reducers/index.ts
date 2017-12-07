export * from './entries'
import { combineReducers } from 'redux'
import { entries } from './entries'

export const reducer = combineReducers({
  entries: (entries as any)
})
