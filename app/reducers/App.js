import { currentWhy } from "./Why";
import { currentWhatIf } from "./WhatIf";
import { combineReducers } from "redux";
import { auth } from './Auth';
import { apolloClient } from '../store/ApolloClient';





export const App = combineReducers({
  currentWhy,
  currentWhatIf,
  auth,
  apollo: apolloClient.reducer()
});


