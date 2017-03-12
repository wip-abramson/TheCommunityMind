export const ADD_WHATIF = "ADD_WHATIF";
export const LOAD_WHATIF = "LOAD_WHATIF";
export const UPDATE_CURRENT_WHATIF = "UPDATE_CURRENT_WHATIF";

export function addWhatIf (question) {
  return {type: ADD_WHATIF, question: question}
}

export function updateCurrentWhatIf (whatIf) {
  return {type: UPDATE_CURRENT_WHATIF, whatIf: whatIf}
}
