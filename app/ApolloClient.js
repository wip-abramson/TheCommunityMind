/**
 * Created by will on 10/11/17.
 */
import { loginSuccess, signOut } from './actions/Auth';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import jwtDecode from 'jwt-decode';
import { store } from './store/store';

const httpLink = new HttpLink({
  uri: process.env.NODE_ENV === 'production' ? 'https://thecommunitymind.com/graphql' : 'http://0.0.0.0:5000/graphql'
});

const middlewareLink = setContext(() => (

  {
    //       req.options.headers.authorization = ;
    headers: {
      Authorization: fetchTokenHeader()
    }
  }));

const errorLink = onError(({ networkError = {}, graphQLErrors }) => {
  if (networkError.statusCode === 401) {
    console.log('Unauthorised')
    signOut();
  }
})

const afterwareLink = new ApolloLink((operation, forward) => {
  return forward(operation).map(response => {
    const context = operation.getContext();
    const { response: { headers } } = context;

    if (headers) {
      const token = headers.get("token");

      if (token) {
        console.log('got token', token)
        var tokenObj = JSON.parse(token);
        localStorage.setItem("token", token);
        store.dispatch(loginSuccess(jwtDecode(tokenObj.value)));

      }

    }
    return response;
  });
});

// const link = middlewareLink.concat(httpLink, errorLink, afterwareLink);

const link = ApolloLink.from([errorLink, afterwareLink, middlewareLink, httpLink]);

function fetchTokenHeader() {
  const token = localStorage.getItem('token');
    console.log("Got token", token)
    if (token) {
      var tokenObj = JSON.parse(token)
      return `Bearer ${tokenObj.value}`;

      // console.log(jwtDecode(tokenObj.value))
      // jwtDecode(tokenObj).then()

    }
    return null;
}

// networkInterface.use([{
//   applyMiddleware(req, next) {
//     if (!req.options.headers) {
//       req.options.headers = {};  // Create the header object if needed.
//     }
//     // get the authentication token from local storage if it exists
//     const token = localStorage.getItem('token');
//     console.log("Got token", token)
//     if (token) {
//       var tokenObj = JSON.parse(token)
//       req.options.headers.authorization = `Bearer ${tokenObj.value}`;
//
//       // console.log(jwtDecode(tokenObj.value))
//       // jwtDecode(tokenObj).then()
//
//     }
//     next();
//   }
// }]);

export const apolloClient = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
});