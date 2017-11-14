/**
 * Created by will on 10/11/17.
 */
import { loginSuccess, signOut } from '../actions/Auth';
import { ApolloClient, createNetworkInterface } from "react-apollo";
import jwtDecode from 'jwt-decode';
import { store } from './store';


const networkInterface = createNetworkInterface({
  uri: 'http://0.0.0.0:5000/graphql',
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
        store.dispatch(loginSuccess(jwtDecode(tokenObj.value)));

    }
    next();
  }
}]);

export const apolloClient = new ApolloClient({
  networkInterface,
});