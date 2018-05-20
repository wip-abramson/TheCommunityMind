/**
 * Created by will on 19/05/18.
 */
import gql from 'graphql-tag';
import QUESTION_FRAGMENT from '../fragments/question.fragment';

const QUESTION_BY_ID_QUERY = gql`
  query questionById($questionId: ID!) {
    questionById(questionId: $questionId) {
      ...QuestionFragment
    }
   }
   ${QUESTION_FRAGMENT}
`;

export default QUESTION_BY_ID_QUERY;