import {ADD_WHATIF, UPDATE_CURRENT_WHATIF} from "../actions/WhatIf";



export function currentWhatIf(state = null, action) {
  switch (action.type) {
    case UPDATE_CURRENT_WHATIF:
      return Object.assign({}, state, action.whatIf)
    default:
      return state

  }
}
