/**
 * Created by will on 28/07/17.
 */
export const LOGIN_USER = "LOGIN_USER";
export const SIGN_OUT = "SIGN_OUT";

export function loginUser(user) {
  return {type: LOGIN_USER, user: user}
}

export function signOut() {
  return {type: SIGN_OUT}
}
