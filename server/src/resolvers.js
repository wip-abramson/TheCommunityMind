import { Topic } from "./db";
import GraphQLDate from 'graphql-date';

import { authLogic } from './logic/AuthLogic';
import { userLogic } from './logic/UserLogic';
import { questionLogic } from './logic/QuestionLogic';
import { whyLogic } from './logic/WhyLogic';
import { whatIfLogic } from './logic/WhatIfLogic';
import { howLogic } from './logic/HowLogic';

export const resolvers = {
  Date: GraphQLDate,

  Query: {
    topics(){
      return Topic.findAll();
    },
    whys: (_, args, ctx) => {

      return whyLogic.query(_, args, ctx);
    },
    whatIfs: (_, args, ctx) => {
      return whatIfLogic.query(_, args, ctx);
    },
    hows(_, args, ctx) {
      return howLogic.query(_, args, ctx);
    },

  },
  Mutation: {
    addTopic: (root, args) => {
      return Topic.create({ name: args.name })
    },
    createWhy(_, args, ctx) {
      return whyLogic.createWhy(_, args, ctx);

    },
    createWhatIf: (_, args, ctx) => {
      return whatIfLogic.createWhatIf(_, args, ctx)
    },
    createHow: (_, args, ctx) => {
      return howLogic.createHow(_, args, ctx)

    },
    deleteQuestion: (_, args, ctx) => {
      return questionLogic.deleteQuestion(_, args, ctx);
    },
    starQuestion(_, args, ctx) {
      return questionLogic.starQuestion(_, args, ctx)
    },
    register: (_, args, ctx) => {
      // find user by email
      return authLogic.register(_, args, ctx);

    },
    login: (_, args, ctx) => {
      return authLogic.login(_, args, ctx);
    },

  },

  Topic: {
    whys(topic) {
      return topic.getWhys()
    },
  },

  Question: {
    owner(question, args, ctx) {
      return questionLogic.user(question, args, ctx);
    },
    staredBy(question, args, ctx) {
      return questionLogic.staredBy(question, args, ctx);
    },
    stars(question, args, ctx) {
      return questionLogic.stars(question, args, ctx);
    },
    staredByCurrentUser(question, args, ctx) {
      return questionLogic.staredByCurrentUser(question, args, ctx)
    }
  },

  Why: {
    whatIfs(why, args, ctx) {
      return whyLogic.whatIfs(why, args, ctx);
    },
    question(why, args, ctx) {
      return whyLogic.question(why, args, ctx);
    }
  },
  WhatIf: {
    hows(whatIf, args, ctx) {
      return whatIfLogic.hows(whatIf, args, ctx);
    },
    question(whatIf, args, ctx) {
      return whatIfLogic.question(whatIf, args, ctx);
    }
  },

  How: {
    question(how, args, ctx) {
      return howLogic.question(how, args, ctx);
    },
  },

  User: {
    questions(user, args, ctx) {
      return userLogic.questions(user, args, ctx);
    },
    jwt(user, args, ctx) {
      return userLogic.jwt(user, args, ctx);
    },
    staredQuestions(user, args, ctx) {
      return userLogic.staredQuestions(user, args, ctx);
    },
    follows(user, args, ctx) {
      return userLogic.follows(user, args, ctx);
    },
    followers(user, args, ctx) {
      return userLogic.followers(user, args, ctx);
    }

  }
}