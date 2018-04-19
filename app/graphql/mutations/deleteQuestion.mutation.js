/**
 * Created by will on 17/04/18.
 */
import {gql} from 'react-apollo';
import QUESTION_FRAGMENT from '../fragments/question.fragment';

const DELETE_QUESTION_MUTATION = gql`
  mutation deleteQuestion($id: ID!) {
    deleteQuestion(id: $id) {
      ... QuestionFragment
    }
  }
  ${QUESTION_FRAGMENT}
`;

export default DELETE_QUESTION_MUTATION;