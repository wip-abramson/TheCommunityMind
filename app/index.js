import React from 'react'
import ReactDOM from 'react-dom'
import AppRouter from './config/routes'
import { App, client } from './reducers/App'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import {  ApolloProvider } from 'react-apollo';

import { addTopic } from './actions/Topic'



let store = createStore(
    App,
    {}, // initial state
    compose(
        applyMiddleware(client.middleware()),
        // If you are using the devToolsExtension, you can add it here also
        (typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
    )
)

let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
)

store.dispatch(addTopic("Transport"))
store.dispatch(addTopic("Goverment"))

ReactDOM.render(
  <ApolloProvider store={store} client={client}>
    <AppRouter />
  </ApolloProvider>,
  document.getElementById("app"))
