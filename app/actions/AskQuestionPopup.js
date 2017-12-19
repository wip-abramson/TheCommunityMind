/**
 * Created by will on 19/12/17.
 */
export const SHOW_POPUP = "SHOW_POPUP";
export const HIDE_POPUP = "HIDE_POPUP";
export const SET_QUESTION_TYPE = "SET_QUESTION_TYPE";

export const WHY = "WHY";
export const WHATIF = "WHATIF";
export const HOW = "HOW";

export function showAskQuestionPopup(currentWhy, currentWhatIf) {
  console.log("SHOW ASK Q POPUP")
  return { type: SHOW_POPUP, currentWhy: currentWhy, currentWhatIf: currentWhatIf }
}

export function hideAskQuestionPopup() {
  return { type: HIDE_POPUP }
}

export function setQuestionType(questionType) {
  return { type: SET_QUESTION_TYPE, questionType: questionType}
}