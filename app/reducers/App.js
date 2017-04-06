import {currentWhy} from "./Why";
import {currentWhatIf} from "./WhatIf";
import {currentTopic} from "./Topic";
import {headerType} from "./TopicHeader";
import {combineReducers} from "redux";
import {ApolloClient, createNetworkInterface} from "react-apollo";

// const wsClient = new SubscriptionClient(`http://localhost:6000/`, {
//     reconnect: true
// });

const networkInterface = createNetworkInterface({
  uri: 'http://localhost:5000/graphql',
  // opts: {
  //     credentials: 'same-origin',
  // },
})

// Extend the network interface with the WebSocket
// const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
//     networkInterface,
//     wsClient
// );

// Finally, create your ApolloClient instance with the modified network interface
export const client = new ApolloClient({
  networkInterface: networkInterface
});

export const App = combineReducers({
  currentTopic,
  currentWhy,
  currentWhatIf,
  headerType,
  apollo: client.reducer()
});


