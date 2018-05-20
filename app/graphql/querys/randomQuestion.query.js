/**
 * Created by will on 19/05/18.
 */
import gql from 'graphql-tag';
import QUESTION_FRAGMENT from '../fragments/question.fragment';

const RANDOM_QUESTION_QUERY = gql`
  query randomQuestion($visitedQuestionIds: [ID]!) {
    randomQuestion(visitedQuestionIds: $visitedQuestionIds) {
      ...QuestionFragment
    }
   }
   ${QUESTION_FRAGMENT}
`;

export default RANDOM_QUESTION_QUERY;