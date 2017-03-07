export const ADD_TOPIC = "ADD_TOPIC";
export const LOAD_TOPICS = "LOAD_TOPICS";

export function addTopic (topic) {
  return {type: ADD_TOPIC, topic: topic}
}
