import { currentWhy } from "./Why";
import { currentWhatIf } from "./WhatIf";
import { combineReducers } from "redux";
import { currentUser } from './User';
import { ApolloClient, createNetworkInterface } from "react-apollo";

const networkInterface = createNetworkInterface({
  uri: 'http://0.0.0.0:5000/graphql',
  opts: {
    credentials: 'include',
  },
});

// Finally, create your ApolloClient instance with the modified network interface
export const client = new ApolloClient({
  networkInterface: networkInterface
});

export const App = combineReducers({
  currentWhy,
  currentWhatIf,
  currentUser,
  apollo: client.reducer()
});


