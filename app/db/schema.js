export const typeDefs = `
type Topic {
   id: ID
   name: String
}

type Why {
    id: ID
    question: String
}
# This type specifies the entry points into our API. In this case
# there is only one - "channels" - which returns a list of channels.
type Query {
   topics: [Topic]    # "[]" means this is a list of channels
   whys: [Why]
}
`;
