import {SET_TOPIC_HEADER, TOPIC_HEADERS} from "../actions/TopicHeader";

export function headerType(state = TOPIC_HEADERS.HOME, action) {
  console.log(action.headerType)
  switch (action.type) {
    case SET_TOPIC_HEADER:
      return action.headerType
    default:
      return state;
  }
}
