export const ADD_HOW= "ADD_HOW";
export const LOAD_HOW = "LOAD_HOW";


export function addHow (question) {
  return {type: ADD_HOW, question: question}
}
