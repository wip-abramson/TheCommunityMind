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
// import {resolver, relay} from 'graphql-sequelize';
import { makeExecutableSchema } from 'graphql-tools'

// import { Conn, Tag, User, Why, WhatIf, How, Question } from './db';
//
// const { sequelizeConnection, sequelizeNodeInterface } = relay;
// const {
//   nodeInterface,
//   nodeField,
//   nodeTypeMapper
// } = sequelizeNodeInterface(Conn);

// const Date = new GraphQLScalarType();

// const tagType = new GraphQLObjectType({
//   name: Tag.name,
//   fields: {
//     id: {
//       type: GraphQLID
//     },
//     name: {
//       type: GraphQLString
//     },
//     followers: {
//       type: () => new GraphQLList(userType)
//     },
//     interfaces: [nodeInterface]
//   }
// })
//
//
//
// const userType =  new GraphQLObjectType({
//   name: User.name,
//   fields: {
//     id: {
//       type: GraphQLID
//     },
//     username: {
//       type: GraphQLString,
//       required: true
//     },
//     password: {
//       type: GraphQLString
//     },
//     interestedIn: {
//       type: () => new GraphQLList(tagType)
//     }
//   }
// });

// const userTaskConnection = sequelizeConnection({
//   name: 'userTask',
//   nodeType: tagType,
//   target: User.Tasks | Task, // Can be an association for parent related connections or a model for "anonymous" connections
//   // if no orderBy is specified the model primary key will be used.
//   orderBy: new GraphQLEnumType({
//     name: 'UserTaskOrderBy',
//     values: {
//       AGE: {value: ['createdAt', 'DESC']}, // The first ENUM value will be the default order. The direction will be used for `first`, will automatically be inversed for `last` lookups.
//       TITLE: {value:  ['title', 'ASC']},
//       CUSTOM: {value:  [function (source, args, context, info) {}, 'ASC']} // build and return custom order for sequelize orderBy option
//     }
//   }),
//   where: function (key, value, currentWhere) {
//     // for custom args other than connectionArgs return a sequelize where parameter
//
//     return {[key]: value};
//   },
//   connectionFields: {
//     total: {
//       type: GraphQLInt,
//       resolve: ({source}) => {
//         /*
//          * We return a object containing the source, edges and more as the connection result
//          * You there for need to extract source from the usual source argument
//          */
//         return source.countTasks();
//       }
//     }
//   },
//   edgeFields: {
//     wasCreatedByUser: {
//       type: GraphQLBoolean,
//       resolve: (edge) => {
//         /*
//          * We attach the connection source to edges
//          */
//         return edge.node.createdBy === edge.source.id;
//       }
//     }
//   }
// });

// const userTagConnection = sequelizeConnection({
//   name: "userTag",
//   nodeType: tagType,
//   target: User.Tags || Tag,
//
//   orderBy: new GraphQLEnumType({
//     name: 'UserTaskOrderBy',
//     values: {
//       AGE: {value: ['createdAt', 'DESC']}, // The first ENUM value will be the default order. The direction will be used for `first`, will automatically be inversed for `last` lookups.
//       TITLE: {value:  ['title', 'ASC']},
//       CUSTOM: {value:  [function (source, args, context, info) {}, 'ASC']} // build and return custom order for sequelize orderBy option
//     }
//   }),
//   where: function (key, value, currentWhere) {
//     // for custom args other than connectionArgs return a sequelize where parameter
//
//     return {[key]: value};
//   },
//   connectionFields: {
//     total: {
//       type: GraphQLInt,
//       resolve: ({source}) => {
//         /*
//          * We return a object containing the source, edges and more as the connection result
//          * You there for need to extract source from the usual source argument
//          */
//         return source.countTasks();
//       }
//     }
//   },
//   edgeFields: {
//     wasCreatedByUser: {
//       type: GraphQLBoolean,
//       resolve: (edge) => {
//         /*
//          * We attach the connection source to edges
//          */
//         return edge.node.createdBy === edge.source.id;
//       }
//     }
//   }
//
// })
//
// nodeTypeMapper.mapTypes({
//   [User.name]: userType,
//   [Tag.name]: tagType,
//
// });
//
// const testSchema = new GraphQLSchema({
//   query: new GraphQLObjectType({
//     name: 'RootType',
//     fields: {
//       user: {
//         type: userType,
//         args: {
//           id: {
//             type: GraphQLID
//           }
//         },
//         resolve: resolver(User)
//       },
//       node: nodeField
//     }
//   })
// });

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
    edges: [WhyEdge]
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
    whatIfFeed(cursor: String): WhatIfFeed
    createdAt: Date!
  }
  
  type WhyFeed {
    # Specifies timestamp in list of whys to populate from
    cursor: String!
    
    # list of returned whys
    whys: [Why]!
  }
  
  type WhatIf implements QuestionType{
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
  
  type How implements QuestionType{
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
    questions: [QuestionType]
    jwt: String # json web token for access
    staredQuestions: [QuestionType]
    followersCount: Int!
    followers: [User]
    followsCount: Int!
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
   topTags: [Tag]
   tags: [Tag]    
   whys(first: Int, after: String, last: Int, before: String): WhyConnection!
   user(id: ID!): User
   whatIfs(whyId: ID!): [WhatIf]
   hows(whatIfId: ID!): [How]
   whyFeed(cursor: String): WhyFeed
   howFeed(whatIfId: ID!, cursor: String): HowFeed
   whatIfFeed(whyId: ID!, cursor: String): WhatIfFeed
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
