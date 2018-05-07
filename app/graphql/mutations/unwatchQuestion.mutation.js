/**
 * Created by will on 15/11/17.
 */
import gql from 'graphql-tag';
const UNWATCH_QUESTION_MUTATION = gql`
  mutation unwatchQuestion($id: ID!) {
    unwatchQuestion(id:$id) {
      id
      questionText
      watchedByCurrentUser
    }
  }
`;

export default UNWATCH_QUESTION_MUTATION;