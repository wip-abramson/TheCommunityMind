/**
 * Created by will on 28/07/17.
 */
import { LOGIN_USER, SIGN_OUT } from '../actions/User';

export function currentUser(state = null, action) {
  switch (action.type) {
    case LOGIN_USER:
      return Object.assign({}, state, action.user);
    case SIGN_OUT:
      return Object.assign({}, state, null);
    default:
      return state;
  }
}