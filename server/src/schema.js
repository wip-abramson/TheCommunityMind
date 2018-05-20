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
    superQuestionLinks(first: Int, after: String, last: Int, before: String): QuestionLinkConnection!
    superQuestionsCount: Int!
    subQuestionLinks(first: Int, after: String, last: Int, before: String): QuestionLinkConnection!
    subQuestionsCount: Int!
    relatedQuestionLinks(first: Int, after: String, last: Int, before: String): QuestionLinkConnection!
    relatedQuestionsCount: Int!
    owner: User!
    createdAt: String!
    starredByCurrentUser: Boolean!
    ponderedByCurrentUser: Boolean!
    ponderCount: Int!
    ownedByCurrentUser: Boolean!
    linksToTopics(first: Int, after: String, last: Int, before: String): QuestionTopicLinkConnection!
  }
  
  type QuestionTopicLinkConnection {
    edges: [QuestionTopicLinkEdge]
    pageInfo: PageInfo
  }
  
  type QuestionTopicLinkEdge {
    cursor: String!
    pageInfo: PageInfo
    node: QuestionTopicLink!
  }
  
  type QuestionTopicLink {
    id: ID!
    topic: Topic!
    question: Question!
    approval: Int!
    approvedByCurrentUser: Boolean!
    owner: User!
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
  
  type QuestionLinkConnection {
    edges: [QuestionLinkEdge]
    pageInfo: PageInfo
  }
  
  type QuestionLinkEdge {
    cursor: String!
    pageInfo: PageInfo
    node: QuestionLink!
  }
  
  type QuestionLink {
    fromQuestion: Question!
    toQuestion: Question!
    createdAt: Date!
    approval: Int!
    linkType: String!
    approvedByCurrentUser: Boolean!
    owner: User!
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
    ponders: [Question]
    interestedIn: [Topic]
    totalOstBalance: Int
    totalAirdroppedBalance: Int
  }
  
  
  
  type Query {
   topTopics: [Topic]
   topics: [Topic]    
   user(id: ID!): User
   questionById(questionId: ID!): Question!
   randomQuestion(currentQuestionId: ID): Question!
   questions(parentId: Int, first: Int, after: String, last: Int, before: String): QuestionConnection!
   userStarredQuestions(userId: ID!, first: Int, after: String, last: Int, before: String): QuestionConnection!
   userQuestions(userId: ID!, first: Int, after: String, last: Int, before: String): QuestionConnection!
   questionLinks(linkType: String, linkTypeId: ID): [QuestionLink] 
   
   }
  
  type Mutation {
    createQuestion(questionText: String!, topicIds: [ID]!, linkType: String, questioningId: ID): Question
    
    ponderQuestion(id: ID!): Question
    unponderQuestion(id: ID!): Question
    deleteQuestion(id: ID!): Question
    editQuestion(id: ID!, newQuestionText: String!): Question
    starQuestion(id: ID!): Question
    unstarQuestion(id: ID!): Question
    
    findOrCreateTopic(name: String!): Topic!
    linkQuestionWithTopic(questionId: ID!, topicId: ID!): Topic
    removeTopicLinkFromQuestion(questionId: ID!, topicId: ID!): Topic
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
