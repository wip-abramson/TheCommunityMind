/**
 * Created by will on 20/05/18.
 */
import gql from 'graphql-tag';
import QUESTION_FRAGMENT from '../fragments/question.fragment';

const QUESTION_LINKS_QUERY = gql`
  query questionLinks($questionId: ID!, $linkType: String!) {
    questionLinks(questionId: $questionId, linkType: $linkType) {
      edges {
        node {
          fromQuestion {
            id
            questionText
          }
          toQuestion {
            id
            questionText
          }
          createdAt
          linkType
          owner {
            id
            username
          }
        }
      }
    }
  }
`;

export default QUESTION_LINKS_QUERY;