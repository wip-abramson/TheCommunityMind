import {makeExecutableSchema} from "graphql-tools";
import {resolvers} from "./resolvers";

const typeDefs = `
type Topic {
   id: ID!                # "!" denotes a required field
   name: String!
   whys: [Why]
}

type Why {
    id: ID!
    topicId: ID!
    stars: Int!
    question: String!
    whatIfs: [WhatIf]
}

type WhatIf {
    id: ID!
    whyId: ID!
    stars: Int!
    question: String!
    hows: [How]
   
}

type How {
    id: ID!
    whatIfId: ID!   
    question: String!
    stars: Int!
}

type User {
  id: ID!
  username: String!
  password: String!
  email: String!
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
