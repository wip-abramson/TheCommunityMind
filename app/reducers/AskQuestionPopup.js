/**
 * Created by will on 19/12/17.
 */
import { SHOW_POPUP, HIDE_POPUP, SET_QUESTION_TYPE } from '../actions/AskQuestionPopup';

export function askQuestionPopup(state = {}, action) {
  switch (action.type) {
    case SHOW_POPUP:
      return Object.assign({}, state, {
        visible: true,
        currentWhy: action.currentWhy,
        currentWhatIf: action.currentWhatIf
      });
    case HIDE_POPUP:
      return Object.assign({}, state, { currentWhy: null, currentWhatIf: null, visible: false });
    case SET_QUESTION_TYPE:
      return Object.assign({}, state, { questionType: action.questionType });
    default:
      console.log("DEFAULT")
      return state;
  }
}