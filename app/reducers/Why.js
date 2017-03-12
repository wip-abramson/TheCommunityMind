import { ADD_WHY, UDPDATE_CURRENT_WHY } from '../actions/Why'



var currentId = 0;
export function whys (state = [], action) {

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

export function currentWhy (state=null, action) {
  switch (action.type) {
    case UDPDATE_CURRENT_WHY:
        return Object.assign({}, state, action.why)
    default:
      return state;
  }
}
