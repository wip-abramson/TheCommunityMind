import { Topic, Why, WhatIf, How } from './db'


export const resolvers = {
    Query: {
        topics(){
            return Topic.findAll();
        },
        whys(args) {
            return Why.findAll({
                where: args
            });

        },
        whatIfs(args) {
            return WhatIf.findAll({
                where: args
            });
        },
        hows(args) {
            return How.findAll({
                where: args
            })
        }
    },
    Mutation: {
        addTopic: (root, args) => {
            const newTopic = {name: args.name};
            return Topic.create(newTopic);

        },
    },

    Topic: {
      whys(topic) {
          return topic.getWhys()
      },
    },
    Why: {
        whatIfs(why) {
            return why.getWhatIfs()
        },
    },
    WhatIf: {
        hows(whatIf) {
            return whatIf.getHows()
        },
    },
}