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
      questionsAskedCount
    }
    linksToTopics(first: 4) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      } 
      edges {
        cursor

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
          followedByCurrentUser
        }
        approval
        approvedByCurrentUser
        }
      }   
    }
  }
`;

export default QUESTION_FRAGMENT;