import {currentWhy} from "./Why";
import {currentWhatIf} from "./WhatIf";
import {combineReducers} from "redux";
import {ApolloClient, createNetworkInterface} from "react-apollo";

const networkInterface = createNetworkInterface({
  uri: 'http://0.0.0.0:5000/graphql',
  // opts: {
  //     credentials: 'same-origin',
  // },
})

networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};  // Create the header object if needed.
    }

    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('token');
    req.options.headers.authorization = token ? `Bearer ${token}` : null;
    next();
  }
}]);

// Finally, create your ApolloClient instance with the modified network interface
export const client = new ApolloClient({
  networkInterface: networkInterface
});

export const App = combineReducers({
  currentWhy,
  currentWhatIf,
  apollo: client.reducer()
});


