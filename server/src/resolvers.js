import { Topic, Why, WhatIf, How, User, Question } from "./db";
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
        order: [['createdAt', 'DESC']],

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
    createWhy(root, { userId, question }) {
      console.log('creating Why', userId, question)
      return Why.create({}).then((why) => {
        return why.createQuestion({ question: question, userId: userId, stars: 0, whyId: why.id })
          .then((newQuestion) => {

            why.setQuestion(newQuestion);
            // console.log(why.questionId)
            return why;
          });
        // return why;
      })

    },

    createWhatIf: (root, { userId, whyId, question }) => {
      return WhatIf.create({ whyId: whyId }).then((whatIf) => {
        return whatIf.createQuestion({ question: question, userId: userId, stars: 0, whatIfId: whatIf.id }).then((newQuestion) => {
          whatIf.setQuestion(newQuestion);

          return whatIf;
        })
      })
    },
    createHow: (root, { userId, whatIfId, question }) => {
      return How.create({ whatIfId: whatIfId }).then((how) => {
        return how.createQuestion({ question: question, userId: userId, stars: 0, howId: how.id }).then((newQuestion) => {
          how.setQuestion(newQuestion);
          return how;
        })
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

  Question: {
    owner(question) {
      return question.getUser();
    }
  },

  Why: {
    whatIfs(why) {
      return why.getWhatIfs();
    },
    question(why) {
      // console.log(why.getQuestion())
      return why.getQuestion();
      // return Question.findOne({where: {whyId: why.id}})
    }
  },
  WhatIf: {
    hows(whatIf) {
      return whatIf.getHows();
    },
    question(whatIf) {
      return whatIf.getQuestion();
    }
  },

  How: {
    question(how) {
      return how.getQuestion();
    },
  },

  User: {
    questions(user) {
      return user.getQuestions();
    },
  }
}