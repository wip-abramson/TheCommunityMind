/**
 * Created by will on 13/11/17.
 */
import {gql} from 'react-apollo';

const EDIT_QUESTION_MUTATION = gql`
  mutation editQuestion($id: ID!, $question: String!) {
    editQuestion(id: $id, newQuestion: $question) {
      id
      question
    }
  }
`;

export default EDIT_QUESTION_MUTATION;