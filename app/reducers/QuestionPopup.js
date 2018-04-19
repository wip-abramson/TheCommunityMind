/**
 * Created by will on 19/12/17.
 */
import { SHOW_POPUP, HIDE_POPUP, } from '../actions/QuestionPopup';

export function questionPopup(state = {}, action) {
  switch (action.type) {
    case SHOW_POPUP:
      return Object.assign({}, state, {
        parentId: action.parentId,
        question: action.question,
        visible: true,
      });
    case HIDE_POPUP:
      return Object.assign({}, state, { parentId: null, question: null, visible: false });
    default:
      return state;
  }
}