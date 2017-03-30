import { Topic, Why, WhatIf, How } from './db'


export const resolvers = {
    Query: {
        topics(){
            return Topic.findAll();
        },
        whys: (obj, args, info) => {

            return Why.findAll({
                where: {
                    "topicId": args.topicId
                }

            });

        },
        whatIfs: (obj, args, info) => {
            return WhatIf.findAll({
                where: {
                    whyId: args.whyId
                }
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
        },
        addWhatIf: (root, args) => {
            return Why.findById(args.whyId).then(function(why) {
                return why.createWhatIf({question: args.question})
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