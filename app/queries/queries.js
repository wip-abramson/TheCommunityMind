import {gql} from "react-apollo";



export const whyListQuery = gql`
  query WhyListQuery {
    whys {
        id
        question
        stars
     }
   }
`;

export const whatIfListQuery = gql`
    query WhatIfListQuery($parentId: ID!) {
        whatIfs(whyId: $parentId) {
            id
            question
            stars
         }
     }
`;

export const howListQuery = gql`
  query HowListQuery($parentId: ID!) {
    hows(whatIfId: $parentId) {
      id
      question
      stars
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
