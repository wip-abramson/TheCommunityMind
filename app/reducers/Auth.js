/**
 * Created by will on 28/07/17.
 */
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, SIGN_OUT } from '../actions/Auth';

export function auth(state = {}, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return Object.assign({}, state, {isAuthenticating: true});
    case LOGIN_FAILURE:
      return Object.assign({}, state, { isAuthenticating: false, errorMessage: action.errorMessage});
    case LOGIN_SUCCESS:
      console.log("Login SUccess", action);
      return Object.assign({}, state, { isAuthenticating: false, currentUser: action.user, errorMessage: null });
    case SIGN_OUT:
      return Object.assign({}, state, { isAuthenticating: false, currentUser: null, errorMessage: null});
    default:
      return state;
  }
}