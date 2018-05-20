/**
 * Created by will on 15/11/17.
 */
import gql from 'graphql-tag';
const PONDER_QUESTION_MUTATION = gql`
  mutation ponderQuestion($id: ID!) {
    ponderQuestion(id:$id) {
      id
      ponderedByCurrentUser
      ponderCount
    }
  }
`;

export default PONDER_QUESTION_MUTATION;