import { Topic, Why, WhatIf, How } from './db'


export const resolvers = {
    Query: {
        topics(){
            return Topic.findAll();
        },
        whys: function(obj, args, info) {

            return Why.findAll({
                where: {
                    "topicId": args.topicId
                }

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
        addWhy: (root, args) => {

            return Topic.findById(args.topicId).then(function(topic) {
                return topic.createWhy({question: args.question})
            })

        }
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