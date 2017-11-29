// import {
//   graphql,
//   GraphQLSchema,
//   GraphQLObjectType,
//   GraphQLString,
//   GraphQLScalarType,
//   GraphQLBoolean,
//   GraphQLID,
//   GraphQLEnumType,
//   GraphQLInt,
//   GraphQLList
// } from 'graphql';
import {resolvers} from "./resolvers";
import { makeExecutableSchema } from 'graphql-tools'


const typeDefs = `
  scalar Date
  
  type Tag {
   id: ID!                # "!" denotes a required field
   name: String!
   followers: [User]
   numberOfFollowers: Int!
   questions: [Question]
   questionFeed(cursor: String): QuestionFeed
  }
  
  type PageInfo {
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
  }
  
  type Question {
    id: ID!
    stars: Int!
    staredBy: [User]!
    question: String!
    owner: User!
    createdAt: Date!
    staredByCurrentUser: Boolean!
    watchedByCurrentUser: Boolean!
    associatedWith: [Tag]
  }
  
   
  type QuestionFeed {
    cursor: String!
    
    questions: [QuestionFeed]!
  }
  
  interface QuestionType {
    id: ID!
    question: Question!
    createdAt: Date!
  }
  
  type QuestionTypeConnection {
    edges: [QuestionTypeEdge]
    pageInfo: PageInfo
  }
  
  type QuestionTypeEdge {
    cursor: String!
    pageInfo: PageInfo
    node: QuestionType!
  }
  
  type WhyConnection {
    edges: [WhyEdge]
    pageInfo: PageInfo
  }
  
  type WhyEdge {
    cursor: String!
    node: Why!
  }
  
  type Why implements QuestionType{
    id: ID!
    question: Question!
    whatIfs: [WhatIf]!
    createdAt: Date!
  }
  
  type WhatIfConnection {
    edges: [WhatIfEdge]
    pageInfo: PageInfo!
  }
  
  type WhatIfEdge {
    node: WhatIf!
    cursor: String!
  }

  type WhatIf implements QuestionType{
    id: ID!
    question: Question!
    createdAt: Date!
    hows: [How]!
  }
  
  
  type HowConnection {
    edges: [HowEdge]
    pageInfo: PageInfo!
  }
  
  type HowEdge {
    node: How!
    cursor: String!
  }
  
  type How implements QuestionType{
    id: ID!
    question: Question!
    createdAt: Date!
  }
  
  
  type User {
    id: ID!
    username: String!
    password: String!
    email: String!
    whys(first: Int, after: String, last: Int, before: String): WhyConnection!
    hows(first: Int, after: String, last: Int, before: String): HowConnection!
    whatIfs(first: Int, after: String, last: Int, before: String): WhatIfConnection!
    questions(first: Int, after: String, last: Int, before: String): QuestionTypeConnection
    jwt: String # json web token for access
    staredQuestions(first: Int, after: String, last: Int, before: String): QuestionTypeConnection
    followersCount: Int!
    followers: [User]
    followsCount: Int!
    follows: [User]
    followedByCurrentUser: Boolean!
    watches: [Question]
    interestedIn: [Tag]
  }
  
  
  
  type Query {
   topTags: [Tag]
   tags: [Tag]    
   whys(first: Int, after: String, last: Int, before: String): WhyConnection!
   user(id: ID!): User
   whatIfs(whyId: ID!, first: Int, after: String, last: Int, before: String): WhatIfConnection!
   hows(whatIfId: ID!, first: Int, after: String, last: Int, before: String): HowConnection!
   userWhys(userId: ID!, first: Int, after: String, last: Int, before: String): WhyConnection!
   userWhatIfs(userId: ID!, first: Int, after: String, last: Int, before: String): WhatIfConnection!
   userHows(userId: ID!, first: Int, after: String, last: Int, before: String): HowConnection!
   userStaredQuestions(userId: ID!, first: Int, after: String, last: Int, before: String): QuestionTypeConnection!
   userQuestions(userId: ID!, first: Int, after: String, last: Int, before: String): QuestionTypeConnection!

   }
  
  type Mutation {
    createWhy(question: String!, tagIds: [ID]!): Why
    createWhatIf(question: String!, whyId: ID!): WhatIf
    createHow(question: String!, whatIfId: ID!): How
    findOrCreateTag(name: String!): Tag!
    associateQuestionWithTag(questionId: ID!, tagId: ID!): Tag
    removeTagAssociationWithQuestion(questionId: ID!, tagId: ID!): Tag
    addUserInterest(userId: ID!, tagId: ID!): Tag
    removeUserInterest(userId: ID!, tagId: ID!): Tag
    followUser(id: ID!): User
    unfollowUser(id: ID!): User
    watchQuestion(id: ID!): Question
    unwatchQuestion(id: ID!): Question
    deleteQuestion(id: ID!): Question
    editQuestion(id: ID!, newQuestion: String!): Question
    starQuestion(id: ID!): Question
    unstarQuestion(id: ID!): Question
    register(username: String, password: String!, email: String!): User
    login(email: String!, password: String!): User
  }
`;

const schema = makeExecutableSchema({typeDefs, resolvers})


export {schema};
