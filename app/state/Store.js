import { createStore } from 'redux'
import App from '../reducers/App'



let store = createStore(App);

console.log(store.getState());

// Every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener
let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
)


