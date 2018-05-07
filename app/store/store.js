/**
 * Created by will on 10/11/17.
 */
import {createStore, applyMiddleware, compose} from "redux";
import { App } from '../reducers/App';
import { apolloClient } from '../ApolloClient';



export const store = createStore(
  App,
  {}, // initial state
)