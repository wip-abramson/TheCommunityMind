import GraphQLDate from 'graphql-date';

import { authLogic } from './logic/AuthLogic';
import { userLogic } from './logic/UserLogic';
import { questionLogic } from './logic/QuestionLogic';
import { topicLogic } from './logic/TopicLogic';
import { ostLogic } from './logic/OstLogic';

export const resolvers = {
  Date: GraphQLDate,

  Query: {
    topTopics: (_, args, ctx) => {
      return topicLogic.topTopics(_, args, ctx);
    },
    topics: (_, args, ctx) => {
      return topicLogic.query(_, args, ctx);
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
    },


  },
  Mutation: {
    createQuestion(_, args, ctx) {
      return questionLogic.createQuestion(_, args, ctx);

    },
    findOrCreateTopic(_, args, ctx) {
      return topicLogic.findOrCreateTopic(_, args, ctx);
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
    associateQuestionWithTopic(_, args, ctx) {
      return questionLogic.associateQuestionWithTopic(_, args, ctx);
    },
    removeTopicAssociationWithQuestion(_, args, ctx) {
      return questionLogic.removeTopicAssociationWithQuestion(_, args, ctx);
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

  Topic: {
    questions(topic, args, ctx) {
      topicLogic.questions(topic, args, ctx);
    },
    followers(topic, args, ctx) {
      topicLogic.followers(topic, args, ctx);
    },
    numberOfFollowers(topic, args, ctx) {
      topicLogic.numberOfFollowers(topic, args, ctx)
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
    superQuestions(question, args, ctx) {
      return questionLogic.superQuestions(question, args, ctx);
    },
    subQuestions(question, args, ctx) {
      return questionLogic.subQuestions(question, args, ctx);
    },
    subQuestionsCount(question, args, ctx) {
      return questionLogic.subQuestionsCount(question, args, ctx);
    },
    superQuestionsCount(question, args, ctx) {
      return questionLogic.superQuestionsCount(question, args, ctx);
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
    questionsAskedCount(user, args, ctx) {
      return userLogic.questionsAskedCount(user, args, ctx);
    },
    jwt(user, args, ctx) {
      return userLogic.jwt(user, args, ctx);
    },
    starredQuestions(user, args, ctx) {
      return userLogic.starredQuestions(user, args, ctx);
    },
    questionsStarredCount(user, args, ctx) {
      return userLogic.questionsStarredCount(user, args, ctx);
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
    totalOstBalance(user, args, ctx) {
      // return 100;
      return userLogic.totalOstBalance(user, args, ctx);
    },
    totalAirdroppedBalance(user, args, ctx) {
      // return 50;
      return userLogic.totalAirdroppedBalance(user, args, ctx);
    }

  },
}