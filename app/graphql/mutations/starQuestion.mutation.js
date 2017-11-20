/**
 * Created by will on 13/11/17.
 */
import { gql } from 'react-apollo';

const STAR_QUESTION_MUTATION = gql`
  mutation starQuestion($id: ID!) {
    starQuestion(id: $id){
       id
       question
       staredByCurrentUser
       watchedByCurrentUser
       stars
     }
   }
 `;

export default STAR_QUESTION_MUTATION;