import { Topic, Why, WhatIf, How, User } from "./db";
import { saveUser, comparePassword } from './security';
import GraphQLDate from 'graphql-date';

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
  Date: GraphQLDate,

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

  },
  Mutation: {
    addTopic: (root, args) => {
      return Topic.create({ name: args.name })
    },
    addWhy: (root, args) => {
      return Why.create({ question: args.question, stars: 0 })
    },

    addWhatIf: (root, args) => {
      return Why.findById(args.whyId).then(function (why) {
        return why.createWhatIf({ question: args.question, stars: 0 })
      })
    },
    addHow: (root, args) => {
      return WhatIf.findById(args.whatIfId).then(function (whatIf) {
        return whatIf.createHow({ question: args.question, stars: 0 })
      })
    },
    addUser: (root, args) => {
      // console.log("Adding user")
      saveUser(args.username, args.password, args.email)

    },
    login: (obj, args, info) => {
      User.find({
        where: {
          username: args.username
        }
      }).then((user) => {
        comparePassword(args.password, user.password)
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
    owner(why) {
      return why.getUser();
    },
  },
  WhatIf: {
    hows(whatIf) {
      return whatIf.getHows();
    },
    owner(whatIf) {
      return whatIf.getUser();
    },
  },

  How: {
    owner(how) {
      return how.getUser();
    },
  },

  User: {
    whys(user) {
      return Why.findAll({
        where: {userId: user.id}
      });
    },
    whatIfs(user) {
      return WhatIf.findAll({
        where: {userId: user.id}
      });
    },
    hows(user) {
      return How.findAll({
        where: {userId: user.id}
      });
    }
  }
}