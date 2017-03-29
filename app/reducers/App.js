import { whys, currentWhy } from './Why'
import { hows } from './How'
import { whatIfs, currentWhatIf } from './WhatIf'
import { topics, currentTopic } from './Topic'
import { headerType } from './TopicHeader'
import { combineReducers } from 'redux'
import { ApolloClient, createNetworkInterface } from 'react-apollo'

const networkInterface = createNetworkInterface({
    uri: 'http://localhost:5000/graphql'
})

export const client = new ApolloClient({
    networkInterface
});

export const App = combineReducers({
  whys,
  whatIfs,
  hows,
  currentTopic,
  currentWhy,
  currentWhatIf,
  headerType,
  apollo: client.reducer()
});


