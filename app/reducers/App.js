import { currentWhy } from "./Why";
import { currentWhatIf } from "./WhatIf";
import { combineReducers } from "redux";
import { auth } from './Auth';
import { askQuestionPopup } from './AskQuestionPopup';
import { apolloClient } from '../store/ApolloClient';

import {reducer as notifications} from 'react-notification-system-redux';




export const App = combineReducers({
  currentWhy,
  currentWhatIf,
  auth,
  askQuestionPopup,
  notifications,
  apollo: apolloClient.reducer()
});


