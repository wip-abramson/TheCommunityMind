export const ADD_WHY = "ADD_WHY";
export const LOAD_WHYS = "LOAD_WHYS";
export const UDPDATE_CURRENT_WHY = "UDPDATE_CURRENT_WHY";

export function addWhy(question) {
  return {type: ADD_WHY, question: question}
}

export function updateCurrentWhy(why) {
  return {type: UDPDATE_CURRENT_WHY, why: why}
}
