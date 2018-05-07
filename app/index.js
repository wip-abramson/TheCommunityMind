import React from "react";
import ReactDOM from "react-dom";
import AppRouter from "./config/routes";
import { Provider } from 'react-redux';
import { store } from './store/store';
import { apolloClient } from "./ApolloClient";
import { ApolloProvider } from "react-apollo";

// let unsubscribe = store.subscribe(() =>
//   console.log(store.getState())
// )

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </ApolloProvider>,
  document.getElementById("app"));

