/**
 * Created by will on 10/11/17.
 */
import {createStore, applyMiddleware, compose} from "redux";
import { App } from '../reducers/App';
import { apolloClient } from '../ApolloClient';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native

const persistConfig = {
  key: 'root',
  storage
}

const persistedReducer = persistReducer(persistConfig, App)


export const store = createStore(persistedReducer,
  {}, // initial state
  compose(
    applyMiddleware(apolloClient.middleware()),
    // If you are using the devToolsExtension, you can add it here also
    (typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
  ));

export const persistor = persistStore(store);

// export const store = createStore(
//   App,
//
// )