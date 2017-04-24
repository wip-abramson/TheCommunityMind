import {Topic, Why, WhatIf, How} from "./db";

/**
 * The authenticated function checks for a user and calls the next function in the composition if
 * one exists. If no user exists in the context then an error is thrown.
 */
// const authenticated =
//   (fn) =>
//     (parent, args, context, info) => {
//       if (context.user) {
//         return fn(parent, args, context, info);
//       }
//       return null;
//     };

/*
 * getLoggedInUser returns the logged in user from the context.
 */
// const getLoggedInUser = (parent, args, context, info) => context.user;

export const resolvers = {
  Query: {
    topics(){
      return Topic.findAll();
    },
    whys: (obj, args, info) => {

      return Why.findAll({
        // where: {
        //   "topicId": args.topicId
        // }

      });

    },
    whatIfs: (obj, args, info) => {
      return WhatIf.findAll({
        where: {
          whyId: args.whyId
        }
      });
    },
    hows: (obj, args, info) => {
      return How.findAll({
        where: {
          whatIfId: args.whatIfId
        }
      })
    },
    me: (parent, args, context, info) => {
      if (context.user) {
        return context.user;
      }
      return null;
    }
  },
  Mutation: {
    addTopic: (root, args) => {
      return Topic.create({name: args.name})
    },
    addWhy: (root, args) => {
      return Why.create({question: args.question, stars: 0})
    },

    addWhatIf: (root, args) => {
      return Why.findById(args.whyId).then(function (why) {
        return why.createWhatIf({question: args.question, stars: 0})
      })
    },
    addHow: (root, args) => {
      return WhatIf.findById(args.whatIfId).then(function (whatIf) {
        return whatIf.createHow({question: args.question, stars: 0})
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