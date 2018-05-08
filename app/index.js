import React from "react";
import ReactDOM from "react-dom";
import AppRouter from "./config/routes";
import {store, persistor} from './store/store';
import { apolloClient } from "./ApolloClient";
import { ApolloProvider } from "react-apollo";
import { PersistGate } from 'redux-persist/integration/react'

// let unsubscribe = store.subscribe(() =>
//   console.log(store.getState())
// )

ReactDOM.render(
  <ApolloProvider store={store} client={apolloClient}>
    <PersistGate loading={null} persistor={persistor}r>
      <AppRouter />
    </PersistGate>
  </ApolloProvider>,
  document.getElementById("app"));

