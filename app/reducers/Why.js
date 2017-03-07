import { ADD_WHY } from '../actions/Why'


var currentId = 0;
export default function whys (state = [], action) {

  switch (action.type) {
    case ADD_WHY:
    console.log("Adding " + action.question)
      return ([
          ...state,
          {
            id: ++currentId,
            question: action.question
          }
        ])
    default:
      return state;
  }

}
