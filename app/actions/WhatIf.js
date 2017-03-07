
export const ADD_WHATIF = "ADD_WHATIF";
export const LOAD_WHATIF = "LOAD_WHATIF";

export default function addWhatIf (question) {
  return {type: ADD_WHATIF, question: question}
}
