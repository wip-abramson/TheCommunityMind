import GraphQLDate from 'graphql-date';

import { authLogic } from './logic/AuthLogic';
import { userLogic } from './logic/UserLogic';
import { questionLogic } from './logic/QuestionLogic';
import { tagLogic } from './logic/TagLogic';

export const resolvers = {
  Date: GraphQLDate,

  Query: {
    topTags: (_, args, ctx) => {
      return tagLogic.topTags(_, args, ctx);
    },
    tags: (_, args, ctx) => {
      return tagLogic.query(_, args, ctx);
    },
    user(_, args, ctx) {
      return userLogic.query(_, args, ctx);
    },
    userStarredQuestions(_, args, ctx) {
      return userLogic.userStarredQuestions(_, args, ctx);
    },
    userQuestions(_, args, ctx) {
      return userLogic.userQuestions(_, args, ctx);
    },
    questions(_, args, ctx) {
      return questionLogic.query(_, args, ctx);
    }


  },
  Mutation: {
    createQuestion(_, args, ctx) {
      return questionLogic.createQuestion(_, args, ctx);

    },
    findOrCreateTag(_, args, ctx) {
      return tagLogic.findOrCreateTag(_, args, ctx);
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
    starredBy(question, args, ctx) {
      return questionLogic.starredBy(question, args, ctx);
    },
    stars(question, args, ctx) {
      return questionLogic.stars(question, args, ctx);
    },
    starredByCurrentUser(question, args, ctx) {
      return questionLogic.starredByCurrentUser(question, args, ctx);
    },
    watchedByCurrentUser(question, args, ctx) {
      return questionLogic.watchedByCurrentUser(question, args, ctx);
    },
    ownedByCurrentUser(question, args, ctx) {
      return questionLogic.ownedByCurrentUser(question, args, ctx);
    },
    associatedWith(question, args, ctx) {
      return questionLogic.associatedWith(question, args, ctx);
    },
    parentQuestions(question, args, ctx) {
      return questionLogic.parentQuestion(question, args, ctx);
    },
    childQuestions(question, args, ctx) {
      return questionLogic.childQuestions(question, args, ctx);
    }
  },

  PageInfo: {
    // we will have each connection supply its own hasNextPage/hasPreviousPage functions!
    hasNextPage(connection, args) {
      return connection.hasNextPage();
    },
    hasPreviousPage(connection, args) {
      return connection.hasPreviousPage();
    },
  },

  User: {
    questions(user, args, ctx) {
      return userLogic.questions(user, args, ctx);
    },
    jwt(user, args, ctx) {
      return userLogic.jwt(user, args, ctx);
    },
    starredQuestions(user, args, ctx) {
      return userLogic.starredQuestions(user, args, ctx);
    },
    follows(user, args, ctx) {
      return userLogic.follows(user, args, ctx);
    },
    followsCount(user, args, ctx) {
      return userLogic.followsCount(user, args, ctx);
    },
    followers(user, args, ctx) {
      return userLogic.followers(user, args, ctx);
    },
    followersCount(user, args, ctx) {
      return userLogic.followersCount(user, args, ctx);
    },
    watches(user, args, ctx) {
      return userLogic.watches(user, args, ctx);
    },
    interestedIn(user, args, ctx) {
      return userLogic.interestedIn(user, args, ctx);
    },
    followedByCurrentUser(user, args, ctx) {
      return userLogic.followedByCurrentUser(user, args, ctx);
    },

  },
}