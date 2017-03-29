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
    question: String!
    whatifs: [WhatIf]
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

# This type specifies the entry points into our API. In this case
# there is only one - "channels" - which returns a list of channels.
type Query {
   topics: [Topic]    # "[]" means this is a list of channels
}

type Mutation {
    addTopic(name: String!): Topic
}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers })


export { schema };
