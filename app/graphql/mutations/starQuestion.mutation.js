/**
 * Created by will on 13/11/17.
 */
import gql from 'graphql-tag';
const STAR_QUESTION_MUTATION = gql`
  mutation starQuestion($id: ID!) {
    starQuestion(id: $id){
       id
       starredByCurrentUser
       stars
     }
   }
 `;

export default STAR_QUESTION_MUTATION;