export const typeDefs = `
type Topic {
   id: ID
   name: String
}

type Why {
    id: ID
    question: String
}


type Query {
   topics: [Topic]    
   whys: [Why]
}
`;
