import {
    makeExecutableSchema,
    addMockFunctionsToSchema,
} from 'graphql-tools'

import { resolvers } from './resolvers';

const typeDefs = `
type Topic {
   id: ID!                # "!" denotes a required field
   name: String!
   whys: [Why]
}

type Why {
    id: ID!
    topicId: ID!
    question: String!
    whatIfs: [WhatIf]
}

type WhatIf {
    id: ID!
    question: String!
    hows: [How]
}

type How {
    id: ID!
    question: String!
}

type Query {
   topics: [Topic]    # "[]" means this is a list of channels
   whys(topicId: ID!): [Why]
   whatIfs(whyId: ID): [WhatIf]
   hows(whatIfId: ID): [How]
}

type Mutation {
    addTopic(name: String!): Topic
    addWhy(question: String!, topicId: ID!): Why
    addWhatIf(question: String!): WhatIf
    addHow(question: String!): How
}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers })


export { schema };
