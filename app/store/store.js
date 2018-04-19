/**
 * Created by will on 10/11/17.
 */
import {createStore, applyMiddleware, compose} from "redux";
import { App } from '../reducers/App';
import { apolloClient } from '../ApolloClient';



export const store = createStore(
  App,
  {}, // initial state
  compose(
    applyMiddleware(apolloClient.middleware()),
    // If you are using the devToolsExtension, you can add it here also
    (typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
  )
)