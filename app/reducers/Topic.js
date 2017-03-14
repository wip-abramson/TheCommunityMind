import { ADD_TOPIC, UDPDATE_CURRENT_TOPIC } from '../actions/Topic'

var currentId= 0;
export function topics (state= [], action) {

  switch (action.type) {
  case ADD_TOPIC:
      return [
        ...state,
        {
          id: ++currentId,
          name: action.topic
        }
      ]
  default:
    return state;
  }
}

export function currentTopic (state= null, action) {
  switch (action.type) {
    case UDPDATE_CURRENT_TOPIC:
      return Object.assign({}, state, action.topic)

    default:
      return state;

  }
}
