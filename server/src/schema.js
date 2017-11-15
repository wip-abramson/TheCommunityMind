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
   questionFeed(cursor: String): QuestionFeed
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
  
   
  type QuestionFeed {
    cursor: String!
    
    questions: [QuestionFeed]!
  }
  
  type Why {
    id: ID!
    question: Question!
    whatIfs: [WhatIf]!
    whatIfFeed(cursor: String): WhatIfFeed
    createdAt: Date!
  }
  
  type WhyFeed {
    # Specifies timestamp in list of whys to populate from
    cursor: String!
    
    # list of returned whys
    whys: [Why]!
  }
  
  type WhatIf {
    id: ID!
    question: Question!
    createdAt: Date!
    hows: [How]!
    howFeed(cursor: String): HowFeed
  }
  
  type WhatIfFeed {
    # Specifies timestamp in list of hows to populate from
    cursor: String!
    
    # list of returned hows
    whatIfs: [WhatIf]!
  }
  
  type How {
    id: ID!
    question: Question!
    createdAt: Date!
  }
  
  type HowFeed {
    # Specifies timestamp in list of hows to populate from
    cursor: String!
    
    # list of returned hows
    hows: [How]!
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
    followedByCurrentUser: Boolean!
    watches: [Question]
    interestedIn: [Tag]
  }
  
  type UserFeed {
    cursor: String!
    
    users: [User]!
  }
  
  
  type Query {
   tags: [Tag]    
   whys: [Why]
   user(id: ID!): User
   whatIfs(whyId: ID!): [WhatIf]
   hows(whatIfId: ID!): [How]
   whyFeed(cursor: String): WhyFeed
   howFeed(whatIfId: ID!, cursor: String): HowFeed
   whatIfFeed(whyId: ID!, cursor: String): WhatIfFeed
  }
  
  type Mutation {
    createWhy(question: String!): Why
    createWhatIf(question: String!, whyId: ID!): WhatIf
    createHow(question: String!, whatIfId: ID!): How
    associateQuestionWithTag(questionId: ID!, tagId: ID!): Tag
    removeTagAssociationWithQuestion(questionId: ID!, tagId: ID!): Tag
    addUserInterest(userId: ID!, tagId: ID!): Tag
    removeUserInterest(userId: ID!, tagId: ID!): Tag
    followUser(id: ID!): User
    unfollowUser(id: ID!): User
    watchQuestion(id: ID!): Question
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
