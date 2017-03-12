export const ADD_TOPIC = "ADD_TOPIC";
export const LOAD_TOPICS = "LOAD_TOPICS";
export const UDPDATE_CURRENT_TOPIC = "UDPDATE_CURRENT_TOPIC"


export function addTopic (topic) {
  return {type: ADD_TOPIC, topic: topic}
}

export function updateCurrentTopic (topic) {
  return {type: UDPDATE_CURRENT_TOPIC, topic: topic}
}
