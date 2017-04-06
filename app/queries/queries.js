import {gql} from "react-apollo";

export const whyListQuery = gql`
  query WhyListQuery($parentId: ID!) {
    whys(topicId: $parentId) {
        id
        question
     }
   }
`;

export const whatIfListQuery = gql`
    query WhatIfListQuery($parentId: ID!) {
        whatIfs(whyId: $parentId) {
            id
            question
         }
     }
`;

export const howListQuery = gql`
  query HowListQuery($parentId: ID!) {
    hows(whatIfId: $parentId) {
      id
      question
     }
  }
`

export const topicListQuery = gql`
  query TopicListQuery {
    topics {
      id
      name
    }
  }
`;
