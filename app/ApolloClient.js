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

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  if (token) {
    console.log("GOT TOKEN ")
  }
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  }
});

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

const link = ApolloLink.from([errorLink, afterwareLink, authLink, httpLink]);


export const apolloClient = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
});