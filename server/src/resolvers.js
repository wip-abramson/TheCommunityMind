import { Topic } from './db'

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
        topics(){
            return Topic.findAll();
        },
        // whys: () => {
        //
        // }
    },
    Mutation: {
        addTopic: (root, args) => {
            const newTopic = {name: args.name};
            return Topic.create(newTopic);

        }
    }
}