/**
 * Created by will on 19/12/17.
 */
export const SHOW_POPUP = "SHOW_POPUP";
export const HIDE_POPUP = "HIDE_POPUP";

export function showAskQuestionPopup(currentWhy, currentWhatIf) {
  return {type: SHOW_POPUP, currentWhy, currentWhatIf}
}

export function hideAskQuestionPopup() {
  return {type: HIDE_POPUP}
}