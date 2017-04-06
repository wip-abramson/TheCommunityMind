export const SET_TOPIC_HEADER = "SET_TOPIC_HEADER";


export const TOPIC_HEADERS = {
  WHY: "WHY",
  WHATIF: "WHATIF",
  HOW: "HOW"
}

export function setTopicHeaderType(headerType) {
  return {type: SET_TOPIC_HEADER, headerType: headerType}
}
