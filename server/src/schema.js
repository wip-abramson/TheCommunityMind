import {makeExecutableSchema} from "graphql-tools";
import {resolvers} from "./resolvers";

const typeDefs = `
  scalar Date
  
  type Topic {
   id: ID!                # "!" denotes a required field
   name: String!
   whys: [Why] 
  }
  
  type Question {
    id: ID!
    stars: Int!
    staredBy: [User]!
    question: String!
    owner: User!
    createdAt: Date!
    staredByCurrentUser: Boolean!
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
    whys: [Why]!
    hows: [How]!
    whatIfs: [WhatIf]!
    questions: [Question]!
    jwt: String # json web token for access
    staredQuestions: [Question]!
    followers: [User]
    follows: [User]
  }
  
  
  type Query {
   topics: [Topic]    
   whys(topicId: ID): [Why]
   whatIfs(whyId: ID!): [WhatIf]
   hows(whatIfId: ID!): [How]
   
  }
  
  type Mutation {
    addTopic(name: String!): Topic
    createWhy(question: String!): Why
    createWhatIf(question: String!, whyId: ID!): WhatIf
    createHow(question: String!, whatIfId: ID!): How
    register(username: String, password: String!, email: String!): User
    login(email: String!, password: String!): User
    deleteQuestion(id: ID!): Question
    starQuestion(id: ID!): Question
  }
`;

const schema = makeExecutableSchema({typeDefs, resolvers})


export {schema};
