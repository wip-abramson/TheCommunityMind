import {makeExecutableSchema} from "graphql-tools";
import {resolvers} from "./resolvers";

const typeDefs = `
  scalar Date
  
  type Tag {
   id: ID!                # "!" denotes a required field
   name: String!
   followers: [User]
   numberOfFollowers: Int!
   questions: [Question]
  }
  
  type Question {
    id: ID!
    stars: Int!
    staredBy: [User]!
    question: String!
    owner: User!
    createdAt: Date!
    staredByCurrentUser: Boolean!
    associatedWith: [Tag]
  }
  
  type Why {
    id: ID!
    question: Question!
    whatIfs: [WhatIf]!
  }
  
  type WhatIf {
    id: ID!
    question: Question!
    hows: [How]!
  }
  
  type How {
    id: ID!
    question: Question!
    
  }
  
  type User {
    id: ID!
    username: String!
    password: String!
    email: String!
    whys: [Why]
    hows: [How]
    whatIfs: [WhatIf]
    questions: [Question]
    jwt: String # json web token for access
    staredQuestions: [Question]
    followers: [User]
    follows: [User]
    watches: [Question]
    interestedIn: [Tag]
  }
  
  
  type Query {
   tags: [Tag]    
   whys(topicId: ID): [Why]
   whatIfs(whyId: ID!): [WhatIf]
   hows(whatIfId: ID!): [How]
   
  }
  
  type Mutation {
    createWhy(question: String!): Why
    createWhatIf(question: String!, whyId: ID!): WhatIf
    createHow(question: String!, whatIfId: ID!): How
    associateWithTag(questionId: ID!, tagId: ID!): Question
    deleteQuestion(id: ID!): Question
    starQuestion(id: ID!): Question
    register(username: String, password: String!, email: String!): User
    login(email: String!, password: String!): User
  }
`;

const schema = makeExecutableSchema({typeDefs, resolvers})


export {schema};
