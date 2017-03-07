import { ADD_HOW } from '../actions/How'


var currentId = 0
export default function hows (state = [], action) {
  switch (action.type) {
    case ADD_HOW:
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
