import {makeExecutableSchema} from "graphql-tools";
import {resolvers} from "./resolvers";

const typeDefs = `
  scalar Date
  
  type Topic {
   id: ID!                # "!" denotes a required field
   name: String!
   whys: [Why]
  }
  
  type Why {
    id: ID!
    stars: Int!
    question: String!
    whatIfs: [WhatIf]
    createdAt: Date!
    owner: User!
  }
  
  type WhatIf {
    id: ID!
    stars: Int!
    question: String!
    hows: [How]
    createdAt: Date!
    owner: User!
  }
  
  type How {
    id: ID!
    question: String!
    stars: Int!
    createdAt: Date!
    owner: User!
  }
  
  type User {
    id: ID!
    username: String!
    password: String!
    email: String!
    whys: [Why]
    hows: [How]
    whatIfs: [WhatIf]
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
