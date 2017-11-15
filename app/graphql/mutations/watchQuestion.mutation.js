/**
 * Created by will on 15/11/17.
 */
import { gql } from 'react-apollo'

const WATCH_QUESTION_MUTATION = gql`
  mutation watchQuestion($id: ID!) {
    watchQuestion(id:$id) {
      id
      question
      watchedByCurrentUser
    }
  }
`;

export default WATCH_QUESTION_MUTATION;