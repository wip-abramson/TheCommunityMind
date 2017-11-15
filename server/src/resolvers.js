import { Topic } from "./db";
import GraphQLDate from 'graphql-date';

import { authLogic } from './logic/AuthLogic';
import { userLogic } from './logic/UserLogic';
import { questionLogic } from './logic/QuestionLogic';
import { whyLogic } from './logic/WhyLogic';
import { whatIfLogic } from './logic/WhatIfLogic';
import { howLogic } from './logic/HowLogic';
import { tagLogic } from './logic/TagLogic';

export const resolvers = {
  Date: GraphQLDate,

  Query: {
    tags: () => {
      return tagLogic.query(_, args, ctx);
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
    user(_, args, ctx) {
      console.log("USER QUERY")
      return userLogic.query(_, args, ctx);
    },
    whyFeed(_, args , ctx) {
      return whyLogic.whyFeed(_, args, ctx);
    },
    howFeed(_, args, ctx) {
      return howLogic.paginatedQuery(_, args, ctx);
    },
    whatIfFeed(_, args, ctx) {
      return whatIfLogic.paginatedQuery(_, args, ctx);
    }

  },
  Mutation: {
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
    editQuestion: (_, args, ctx) => {
      return questionLogic.editQuestion(_, args, ctx);
    },
    starQuestion(_, args, ctx) {
      return questionLogic.starQuestion(_, args, ctx)
    },
    unstarQuestion(_, args, ctx) {
      return questionLogic.unstarQuestion(_, args, ctx);
    },
    watchQuestion(_, args, ctx) {
      return questionLogic.watchQuestion(_, args, ctx);
    },
    unwatchQuestion(_, args, ctx) {
      return questionLogic.unwatchQuestion(_, args, ctx);
    },
    associateQuestionWithTag(_, args, ctx) {
      return questionLogic.associateQuestionWithTag(_, args, ctx);
    },
    removeTagAssociationWithQuestion(_, args, ctx) {
      return questionLogic.removeTagAssociationWithQuestion(_, args, ctx);
    },
    addUserInterest(_, args, ctx) {
      return userLogic.addUserInterest(_, args, ctx);
    },
    removeUserInterest(_, args, ctx) {
      return userLogic.removeUserInterest(_, args, ctx);
    },
    followUser(_, args, ctx) {
      return userLogic.followUser(_, args, ctx);
    },
    unfollowUser(_, args, ctx) {
      return userLogic.unfollowUser(_, args, ctx);
    },
    register: (_, args, ctx) => {
      // find user by email
      return authLogic.register(_, args, ctx);

    },

    login: (_, args, ctx) => {
      return authLogic.login(_, args, ctx);
    },

  },

  Tag: {
    questions(tag, args, ctx) {
      tagLogic.questions(tag, args, ctx);
    },
    followers(tag, args, ctx) {
      tagLogic.followers(tag, args, ctx);
    },
    numberOfFollowers(tag, args, ctx) {
      tagLogic.numberOfFollowers(tag, args, ctx)
    }
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
      return questionLogic.staredByCurrentUser(question, args, ctx);
    },
    watchedByCurrentUser(question, args, ctx) {
      return questionLogic.watchedByCurrentUser(question, args, ctx);
    },
    associatedWith(question, args, ctx) {
      return questionLogic.associatedWith(question, args, ctx);
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
    // howFeed(whatIf, args, ctx) {
    //   return howLogic.howFeed(whatIf, args, ctx);
    // },
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
    },
    watches(user, args, ctx) {
      return userLogic.watches(user, args, ctx);
    },
    interestedIn(user, args, ctx) {
      return userLogic.interestedIn(user, args, ctx);
    },
    followedByCurrentUser(user, args, ctx) {
      return userLogic.followedByCurrentUser(user, args, ctx);
    }

  }
}