/**
 * Created by will on 28/07/17.
 */
export const LOGIN_REQUEST = "LOGIN_REQUEST"
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const SIGN_OUT = "SIGN_OUT";

export function loginSuccess(user) {

  return {type: LOGIN_SUCCESS, user: user}
}

export function signOut() {
  return {type: SIGN_OUT}
}

export function loginRequest() {
  return { type: LOGIN_REQUEST}
}

export function loginFailure(errorMessage) {
  return{ type: LOGIN_FAILURE, errorMessage }
}
