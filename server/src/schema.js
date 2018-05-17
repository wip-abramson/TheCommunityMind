import { resolvers } from "./resolvers";
import { makeExecutableSchema } from 'graphql-tools'

const typeDefs = `
  scalar Date
  
  type Topic {
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
    superQuestions(first: Int, after: String, last: Int, before: String): QuestionConnection!
    superQuestionsCount: Int!
    subQuestions(first: Int, after: String, last: Int, before: String): QuestionConnection!
    subQuestionsCount: Int!
    owner: User!
    createdAt: Date!
    starredByCurrentUser: Boolean!
    watchedByCurrentUser: Boolean!
    ownedByCurrentUser: Boolean!
    associatedWith: [Topic]!
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
 
  
  type User {
    id: ID!
    username: String!
    password: String!
    email: String!
    questions(first: Int, after: String, last: Int, before: String): QuestionConnection
    questionsAskedCount: Int!
    jwt: String # json web token for access
    starredQuestions(first: Int, after: String, last: Int, before: String): QuestionConnection
    questionsStarredCount: Int!
    followersCount: Int!
    followers: [User]
    followsCount: Int!
    follows: [User]
    followedByCurrentUser: Boolean!
    watches: [Question]
    interestedIn: [Topic]
    totalOstBalance: Int
    totalAirdroppedBalance: Int
  }
  
  
  
  type Query {
   topTopics: [Topic]
   topics: [Topic]    
   user(id: ID!): User
   questions(parentId: Int, first: Int, after: String, last: Int, before: String): QuestionConnection!
   userStarredQuestions(userId: ID!, first: Int, after: String, last: Int, before: String): QuestionConnection!
   userQuestions(userId: ID!, first: Int, after: String, last: Int, before: String): QuestionConnection!
   }
  
  type Mutation {
    createQuestion(questionText: String!, parentId: ID): Question
    watchQuestion(id: ID!): Question
    unwatchQuestion(id: ID!): Question
    deleteQuestion(id: ID!): Question
    editQuestion(id: ID!, newQuestionText: String!): Question
    starQuestion(id: ID!): Question
    unstarQuestion(id: ID!): Question
    
    findOrCreateTopic(name: String!): Topic!
    associateQuestionWithTopic(questionId: ID!, topicId: ID!): Topic
    removeTopicAssociationWithQuestion(questionId: ID!, topicId: ID!): Topic
    addUserInterest(userId: ID!, topicId: ID!): Topic
    removeUserInterest(userId: ID!, topicId: ID!): Topic
    followUser(id: ID!): User
    unfollowUser(id: ID!): User
   

    
    register(username: String, password: String!, email: String!): User
    login(email: String!, password: String!): User
  }
`;

const schema = makeExecutableSchema({ typeDefs, resolvers })

export { schema };
