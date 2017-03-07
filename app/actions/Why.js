export const ADD_WHY = "ADD_WHY";
export const LOAD_WHYS = "LOAD_WHYS";


export default function addWhy(question) {
  return {type: ADD_WHY, question: question}
}
