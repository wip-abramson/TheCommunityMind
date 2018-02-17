/**
 * Created by will on 19/12/17.
 */
import { SHOW_POPUP, HIDE_POPUP, SET_QUESTION_TYPE } from '../actions/QuestionPopup';

export function questionPopup(state = {}, action) {
  switch (action.type) {
    case SHOW_POPUP:
      return Object.assign({}, state, {
        question: action.question,
        visible: true,
      });
    case HIDE_POPUP:
      return Object.assign({}, state, { question: null, visible: false });
    case SET_QUESTION_TYPE:
      return Object.assign({}, state, { questionType: action.questionType });
    default:
      return state;
  }
}