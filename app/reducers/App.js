import {currentWhy} from "./Why";
import {currentWhatIf} from "./WhatIf";
import {combineReducers} from "redux";
import {ApolloClient, createNetworkInterface} from "react-apollo";

const networkInterface = createNetworkInterface({
  uri: 'http://0.0.0.0:5000/graphql',
  opts: {
      credentials: 'include',
  },
})

// networkInterface.use([{
//   applyMiddleware(req, next) {
//
//     if (!req.options.headers) {
//       req.options.headers = {};  // Create the header object if needed.
//     }
//     req.options.headers = {
//       authourization: localStorage.getItem('token') ? localStorage.getItem('token') : null
//    }
//     next();
//   }
// }]);

// export const getClientError = errors => {
//   if (!errors) return;
//   const error = errors[0].message;
//   return (error.indexOf('{"_error"') === -1) ? {_error: 'Server query error'} : JSON.parse(error);
// }
//
// export const fetchGraphQL = async (graphParams) => {
//   const authToken = localStorage.getItem('myToken');
//   const res = await fetch('http://0.0.0.0:5000/graphql', {
//     method: 'post',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${authToken}`
//     },
//     body: JSON.stringify(graphParams)
//   });
//   const resJSON = await res.json();
//   const {data, errors} = resJSON;
//   return {data, error: getClientError(errors)}
// }

// Finally, create your ApolloClient instance with the modified network interface
export const client = new ApolloClient({
  networkInterface: networkInterface
});

export const App = combineReducers({
  currentWhy,
  currentWhatIf,
  apollo: client.reducer()
});


