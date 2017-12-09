import { EntriesAT, EntriesA } from '../actions'
import { Entry } from '../store'

interface EntriesStoreState {
  [s: string]: Entry
}

export function entries(state: EntriesStoreState = {}, action: EntriesAT): EntriesStoreState {
  switch (action.type) {
    case EntriesA.recieve:
      return {
        ...state,
        ...action.entries
      }
    case EntriesA.add:
      return {
        ...state,
        ...action.entry
      }
    default:
      return state
  }
}
