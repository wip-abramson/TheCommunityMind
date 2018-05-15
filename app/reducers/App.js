import { combineReducers } from "redux";
import { auth } from './Auth';
import { questionPopup } from './QuestionPopup';
import { apolloClient } from '../ApolloClient';

import {reducer as notifications} from 'react-notification-system-redux';




export const App = combineReducers({
  auth,
  questionPopup,
  notifications,
  apollo: apolloClient.reducer()
});


