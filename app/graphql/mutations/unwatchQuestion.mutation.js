/**
 * Created by will on 15/11/17.
 */
import { gql } from 'react-apollo'

const UNWATCH_QUESTION_MUTATION = gql`
  mutation unwatchQuestion($id: ID!) {
    unwatchQuestion(id:$id) {
      id
      question
      watchedByCurrentUser
    }
  }
`;

export default UNWATCH_QUESTION_MUTATION;