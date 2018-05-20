/**
 * Created by will on 24/05/17.
 */
import gql from 'graphql-tag';
const QUESTION_FRAGMENT = gql`
  fragment QuestionFragment on Question {
    id 
    questionText
    stars
    starredByCurrentUser
    ownedByCurrentUser
    ponderedByCurrentUser
    ponderCount
    subQuestionsCount
    superQuestionsCount
    relatedQuestionsCount
    createdAt
    owner {
      id
      username
      followedByCurrentUser
    }
    linksToTopics(first: 4) {
    	
      edges {
        cursor
        pageInfo {
          hasNextPage
          hasPreviousPage
        } 
        node {
					owner {
            id
          }          
          id
          question {
    		id
      }
      topic {
        id
        name
      }
      approval
      approvedByCurrentUser
        }
      }   
    }
  }
`;

export default QUESTION_FRAGMENT;