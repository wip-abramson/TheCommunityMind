/**
 * Created by will on 13/11/17.
 */
import {gql} from 'react-apollo';

const EDIT_QUESTION_MUTATION = gql`
  mutation editQuestion($id: ID!, $questionText: String!) {
    editQuestion(id: $id, newQuestionText: $questionText) {
      id
      questionText
    }
  }
`;

export default EDIT_QUESTION_MUTATION;