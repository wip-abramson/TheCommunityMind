import { createStore } from 'redux'
import App from '../reducers/App'
import addHow from '../actions/How'
import addWhatIf from '../actions/WhatIf'
import addWhy from '../actions/Why'


let store = createStore(App);

console.log(store.getState());

// Every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener
let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
)

store.dispatch(addWhy("Why do people believe in god"))
store.dispatch(addWhatIf("What if people believed in themselves"))
store.dispatch(addHow("How can I make people believe in themselves more"))

unsubscribe()
