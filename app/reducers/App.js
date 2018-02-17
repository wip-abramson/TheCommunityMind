import { currentWhy } from "./Why";
import { currentWhatIf } from "./WhatIf";
import { combineReducers } from "redux";
import { auth } from './Auth';
import { questionPopup } from './QuestionPopup';
import { apolloClient } from '../store/ApolloClient';

import {reducer as notifications} from 'react-notification-system-redux';




export const App = combineReducers({
  currentWhy,
  currentWhatIf,
  auth,
  questionPopup,
  notifications,
  apollo: apolloClient.reducer()
});


