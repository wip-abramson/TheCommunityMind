
const topics = [{
    id: 1,
    name: "Sport"
}   ,
    {
        id: 2,
        name: "Inquiry"
    }];

let nextId = 3;

export const resolvers = {
    Query: {
        topics: () => {
            return topics
        }
    },
    Mutation: {
        addTopic: (root, args) => {
            const newTopic = { id: nextId++, name: args.name};
            topics.push(newTopic);
            return newTopic;
        }
    }
}