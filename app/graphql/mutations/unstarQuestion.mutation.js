/**
 * Created by will on 15/11/17.
 */
import gql from 'graphql-tag';
const UNSTAR_QUESTION_MUTATION = gql`
  mutation unstarQuestion($id: ID!) {
    unstarQuestion(id: $id){
       id
       starredByCurrentUser
       stars
     }
   }
 `;

export default UNSTAR_QUESTION_MUTATION;