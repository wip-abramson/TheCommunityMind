import { ADD_WHATIF } from '../actions/WhatIf'

var currentId = 0;
export default function whatIfs (state = [], action) {

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
