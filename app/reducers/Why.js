import {ADD_WHY, UDPDATE_CURRENT_WHY} from "../actions/Why";


export function currentWhy (state=null, action) {
  switch (action.type) {
    case UDPDATE_CURRENT_WHY:
        return Object.assign({}, state, action.why);
    default:
      return state;
  }
}
