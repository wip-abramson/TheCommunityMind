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
    question: String!
    owner: User!
    createdAt: Date!
  }
  
  type Why {
    id: ID!
    question: Question!
    whatIfs: [WhatIf]
  }
  
  type WhatIf {
    id: ID!
    question: Question!
    hows: [How]
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
  }
  
  
  type Query {
   topics: [Topic]    
   whys(topicId: ID): [Why]
   whatIfs(whyId: ID!): [WhatIf]
   hows(whatIfId: ID!): [How]
   
  }
  
  type Mutation {
    addTopic(name: String!): Topic
    addWhy(question: String!): Why
    addWhatIf(question: String!, whyId: ID!): WhatIf
    addHow(question: String!, whatIfId: ID!): How
    addUser(username: String!, password: String!, email: String!): User
    login(username: String!, password: String!): User
  }
`;

const schema = makeExecutableSchema({typeDefs, resolvers})


export {schema};
