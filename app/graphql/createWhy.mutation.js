/**
 * Created by will on 24/05/17.
 */
import {gql} from 'react-apollo';
import QUESTION_FRAGMENT from './question.fragment';

const CREATE_WHY_MUTATION = gql`
  mutation createWhy($userId: ID!, $question: String!) {
    createWhy(userId: $userId, question: $question) {
     id
     question {
      ... QuestionFragment
     }
    }
    
  }
  ${QUESTION_FRAGMENT}
`;

export default CREATE_WHY_MUTATION;