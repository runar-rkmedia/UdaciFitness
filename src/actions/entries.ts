export const enum EntriesA {
  recieve = 'recieveEntries',
  add = 'addEntry',
}
export type EntriesAT =
  { type: EntriesA.recieve, entries: {} } |
  { type: EntriesA.add, entry: {} }

export function recieveEntries(entries: any): EntriesAT {
  return {
    type: EntriesA.recieve,
    entries
  }
}
export function addEntry(entry: {}): EntriesAT {
  return {
    type: EntriesA.add,
    entry
  }
}
