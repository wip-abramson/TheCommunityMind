/**
 * Created by will on 19/12/17.
 */
export const SHOW_POPUP = "SHOW_POPUP";
export const HIDE_POPUP = "HIDE_POPUP";


export function showQuestionPopup(parentId, question) {
  console.log("SHOW ASK Q POPUP")
  return { type: SHOW_POPUP, question: question, parentId: parentId }
}

export function hideQuestionPopup() {
  return { type: HIDE_POPUP }
}
