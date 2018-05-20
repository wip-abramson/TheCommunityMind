/**
 * Created by will on 15/11/17.
 */
import gql from 'graphql-tag';
const FORGET_QUESTION_MUTATION = gql`
  mutation forgetQuestion($id: ID!) {
    unponderQuestion(id:$id) {
      id
      ponderedByCurrentUser
      ponderCount
    }
  }
`;

export default FORGET_QUESTION_MUTATION;