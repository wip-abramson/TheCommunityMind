/**
 * Created by will on 10/11/17.
 */
import { loginSuccess, signOut } from './actions/Auth';
import { ApolloClient, createNetworkInterface } from "react-apollo";
import jwtDecode from 'jwt-decode';
import store from './store/store';


const networkInterface = createNetworkInterface({

  uri:   process.env.NODE_ENV === 'production'? 'https://thecommunitymind.com/graphql' : 'http://0.0.0.0:5000/graphql',
});


networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};  // Create the header object if needed.
    }
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('token');
    console.log("Got token", token)
    if (token) {
      var tokenObj = JSON.parse(token)
      req.options.headers.authorization = `Bearer ${tokenObj.value}`;

      // console.log(jwtDecode(tokenObj.value))
      // jwtDecode(tokenObj).then()

    }
    next();
  }
}]);

export const apolloClient = new ApolloClient({
  networkInterface,
});


// /**
//  * Created by will on 10/11/17.
//  */
// import { loginSuccess, signOut } from './actions/Auth';
// import { ApolloClient } from 'apollo-client';
// import { HttpLink } from 'apollo-link-http';
// import { setContext } from 'apollo-link-context';
// import { onError } from 'apollo-link-error';
// import { ApolloLink } from 'apollo-link';
// import { InMemoryCache } from 'apollo-cache-inmemory';
// import jwtDecode from 'jwt-decode';
// import { store } from './store/store';
//
// const httpLink = new HttpLink({
//   uri: process.env.NODE_ENV === 'production' ? 'https://thecommunitymind.com/graphql' : 'http://0.0.0.0:5000/graphql'
// });
//
// const authLink = setContext((_, { headers }) => {
//   // get the authentication token from local storage if it exists
//   const tokenJson = localStorage.getItem('token');
//   let token = null;
//   // return the headers to the context so httpLink can read them
//   if (tokenJson) {
//     token = JSON.parse(tokenJson);
//     console.log("GOT TOKEN ", token.value)
//
//   }
//   return {
//     headers: {
//       ...headers,
//       Authorization: token ? `Bearer ${token.value}` : '',
//     }
//   }
// });
//
// const errorLink = onError(({ networkError = {}, graphQLErrors }) => {
//   if (networkError.statusCode === 401) {
//     console.log('Unauthorised', graphQLErrors);
//     localStorage.clear();
//     signOut();
//   }
// })
//
// const afterwareLink = new ApolloLink((operation, forward) => {
//   return forward(operation).map(response => {
//     const context = operation.getContext();
//     const { response: { headers } } = context;
//
//     if (headers) {
//       const token = headers.get("token");
//
//       if (token) {
//         console.log('got token', token)
//         var tokenObj = JSON.parse(token);
//         localStorage.setItem("token", token);
//         store.dispatch(loginSuccess(jwtDecode(tokenObj.value)));
//
//       }
//
//     }
//     return response;
//   });
// });
//
// // const link = middlewareLink.concat(httpLink, errorLink, afterwareLink);
//
// const link = ApolloLink.from([errorLink, afterwareLink, authLink, httpLink]);
//
// function fetchTokenHeader() {
//   const token = localStorage.getItem('token');
//     console.log("Got token", token)
//     if (token) {
//       var tokenObj = JSON.parse(token)
//       const auth = `Bearer ${tokenObj.value}`;
//       console.log('Auth Header', auth);
//       return auth;
//
//       // console.log(jwtDecode(tokenObj.value))
//       // jwtDecode(tokenObj).then()
//
//     }
//     return 'Bearer ' ;
// }
//
// // networkInterface.use([{
// //   applyMiddleware(req, next) {
// //     if (!req.options.headers) {
// //       req.options.headers = {};  // Create the header object if needed.
// //     }
// //     // get the authentication token from local storage if it exists
// //     const token = localStorage.getItem('token');
// //     console.log("Got token", token)
// //     if (token) {
// //       var tokenObj = JSON.parse(token)
// //       req.options.headers.authorization = `Bearer ${tokenObj.value}`;
// //
// //       // console.log(jwtDecode(tokenObj.value))
// //       // jwtDecode(tokenObj).then()
// //
// //     }
// //     next();
// //   }
// // }]);
//
// export const apolloClient = new ApolloClient({
//   link: link,
//   cache: new InMemoryCache(),
// });