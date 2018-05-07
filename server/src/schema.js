import { resolvers } from "./resolvers";
import { makeExecutableSchema } from 'graphql-tools'

const typeDefs = `
  scalar Date
  
  type Tag {
   id: ID!                # "!" denotes a required field
   name: String!
   followers: [User]
   numberOfFollowers: Int!
   questions: [Question]
  }
  
  type PageInfo {
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
  }
  
  type Question {
    id: ID!
    stars: Int!
    starredBy: [User]!
    questionText: String!
    parentQuestions(first: Int, after: String, last: Int, before: String): QuestionConnection!
    childQuestions(first: Int, after: String, last: Int, before: String): QuestionConnection!
    owner: User!
    createdAt: Date!
    starredByCurrentUser: Boolean!
    watchedByCurrentUser: Boolean!
    ownedByCurrentUser: Boolean!
    associatedWith: [Tag]
  }
  

  type QuestionConnection {
    edges: [QuestionEdge]
    pageInfo: PageInfo
  }
  
  type QuestionEdge {
    cursor: String!
    pageInfo: PageInfo
    node: Question!
  }
  
  type OstTransaction {
    id: String!
    currentStatus: String!
  }
  
  type OstAirdrop {
    id: String!
    currentStatus: String!
  }
  
  type User {
    id: ID!
    username: String!
    password: String!
    email: String!
    questions(first: Int, after: String, last: Int, before: String): QuestionConnection
    jwt: String # json web token for access
    starredQuestions(first: Int, after: String, last: Int, before: String): QuestionConnection
    followersCount: Int!
    followers: [User]
    followsCount: Int!
    follows: [User]
    followedByCurrentUser: Boolean!
    watches: [Question]
    interestedIn: [Tag]
    airdropUuid: String
  }
  
  
  
  type Query {
   topTags: [Tag]
   tags: [Tag]    
   user(id: ID!): User
   questions(parentId: Int, first: Int, after: String, last: Int, before: String): QuestionConnection!
   userStarredQuestions(userId: ID!, first: Int, after: String, last: Int, before: String): QuestionConnection!
   userQuestions(userId: ID!, first: Int, after: String, last: Int, before: String): QuestionConnection!
   checkTransactionStatus(tranactionId: String!): OstTransaction!
   checkAirdropStatus(airdropId: String!): OstAirdrop!
   }
  
  type Mutation {
    createQuestion(questionText: String!, parentId: ID): Question
    watchQuestion(id: ID!): Question
    unwatchQuestion(id: ID!): Question
    deleteQuestion(id: ID!): Question
    editQuestion(id: ID!, newQuestionText: String!): Question
    starQuestion(id: ID!): Question
    unstarQuestion(id: ID!): Question
    
    findOrCreateTag(name: String!): Tag!
    associateQuestionWithTag(questionId: ID!, tagId: ID!): Tag
    removeTagAssociationWithQuestion(questionId: ID!, tagId: ID!): Tag
    addUserInterest(userId: ID!, tagId: ID!): Tag
    removeUserInterest(userId: ID!, tagId: ID!): Tag
    followUser(id: ID!): User
    unfollowUser(id: ID!): User
   

    
    register(username: String, password: String!, email: String!): User
    login(email: String!, password: String!): User
  }
`;

const schema = makeExecutableSchema({ typeDefs, resolvers })

export { schema };
