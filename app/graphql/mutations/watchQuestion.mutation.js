/**
 * Created by will on 15/11/17.
 */
import gql from 'graphql-tag';
const WATCH_QUESTION_MUTATION = gql`
  mutation watchQuestion($id: ID!) {
    watchQuestion(id:$id) {
      id
      questionText
      watchedByCurrentUser
    }
  }
`;

export default WATCH_QUESTION_MUTATION;