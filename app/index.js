import React from 'react'
import ReactDOM from 'react-dom'
import AppRouter from './config/routes'
import App from './reducers/App'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

let store = createStore(App);

let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
)

ReactDOM.render(
  <Provider store={store}>
    <AppRouter />
  </Provider>,
  document.getElementById("app"))
