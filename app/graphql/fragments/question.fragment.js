/**
 * Created by will on 24/05/17.
 */
import {gql} from 'react-apollo';

const QUESTION_FRAGMENT = gql`
  fragment QuestionFragment on Question {
    id 
    question
    stars
    staredBy {
      id
      username
    }
    createdAt
    owner {
      id
      username
    }
  }
`;

export default QUESTION_FRAGMENT;