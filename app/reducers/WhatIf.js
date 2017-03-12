import { ADD_WHATIF, UPDATE_CURRENT_WHATIF } from '../actions/WhatIf'

var currentId = 0;
export function whatIfs (state = [], action) {

  switch (action.type) {
    case ADD_WHATIF:
    console.log("Adding " + action.question)
      return [
          ...state,
          {
            id: ++currentId,
            question: action.question
          }
        ]
    default:
      return state;
  }

}

export function currentWhatIf(state = null, action) {
  switch (action.type) {
    case UPDATE_CURRENT_WHATIF:
      return Object.assign({}, state, action.whatIf)
    default:
      return state

  }
}
