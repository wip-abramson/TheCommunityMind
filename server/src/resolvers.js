import GraphQLDate from 'graphql-date';

import { authLogic } from './logic/AuthLogic';
import { userLogic } from './logic/UserLogic';
import { questionLogic } from './logic/QuestionLogic';
import { topicLogic } from './logic/TopicLogic';
import { ostLogic } from './logic/OstLogic';
import { questionLinkLogic } from './logic/QuestionLinkLogic';
import { questionTopicLinkLogic } from './logic/QuestionTopicLinkLogic';

export const resolvers = {
  Date: GraphQLDate,

  Query: {
    questionById(_, args, ctx) {
      return questionLogic.questionQuery(_, args, ctx);
    },
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
    questionLinks(_, args, ctx) {
      return questionLinkLogic.query(_, args, ctx);
    },
    randomQuestion(_, args, ctx) {
      return questionLogic.randomQuestionQuery(_, args, ctx);
    }

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
    ponderQuestion(_, args, ctx) {
      return questionLogic.ponderQuestion(_, args, ctx);
    },
    unponderQuestion(_, args, ctx) {
      return questionLogic.unponderQuestion(_, args, ctx);
    },
    linkQuestionWithTopic(_, args, ctx) {
      return questionLogic.linkQuestionWithTopic(_, args, ctx);
    },
    removeTopicLinkFromQuestion(_, args, ctx) {
      return questionLogic.removeTopicLinkFromQuestion(_, args, ctx);
    },
    followTopic(_, args, ctx) {
      return userLogic.followTopic(_, args, ctx);
    },
    unfollowTopic(_, args, ctx) {
      return userLogic.unfollowTopic(_, args, ctx);
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
    tipUser: (_, args, ctx) => {
      return userLogic.tipUser(_, args, ctx);
    },
    approveQuestionTopicLink(_, args, ctx) {
      return questionTopicLinkLogic.approveQuestionTopicLink(_, args, ctx);
    },
    unapproveQuestionTopicLink(_, args, ctx) {
      return questionTopicLinkLogic.unapproveQuestionTopicLink(_, args, ctx);
    },



    login: (_, args, ctx) => {
      return authLogic.login(_, args, ctx);
    },

  },

  Topic: {
    questions(topic, args, ctx) {
      return topicLogic.questions(topic, args, ctx);
    },
    followers(topic, args, ctx) {
      return topicLogic.followers(topic, args, ctx);
    },
    numberOfFollowers(topic, args, ctx) {
      return topicLogic.numberOfFollowers(topic, args, ctx)
    },
    followedByCurrentUser(topic, args, ctx) {
      return topicLogic.followedByCurrentUser(topic, args, ctx);
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
    ponderCount(question, args, ctx) {
      return questionLogic.ponderCount(question, args, ctx);
    },
    ponderedByCurrentUser(question, args, ctx) {
      return questionLogic.ponderedByCurrentUser(question, args, ctx);
    },
    ownedByCurrentUser(question, args, ctx) {
      return questionLogic.ownedByCurrentUser(question, args, ctx);
    },
    linksToTopics(question, args, ctx) {
      return questionLogic.linksToTopics(question, args, ctx);
    },
    superQuestionLinks(question, args, ctx) {
      return questionLinkLogic.superQuestionLinks(question, args, ctx);
    },
    subQuestionLinks(question, args, ctx) {
      return questionLinkLogic.subQuestionLinks(question, args, ctx);
    },
    subQuestionsCount(question, args, ctx) {
      return questionLinkLogic.subQuestionLinksCount(question, args, ctx);
    },
    superQuestionsCount(question, args, ctx) {
      return questionLinkLogic.superQuestionLinksCount(question, args, ctx);
    },
    relatedQuestionLinks(question, args, ctx) {
      return questionLinkLogic.relatedQuestionLinks(question, args, ctx);
    },
    relatedQuestionsCount(question, args, ctx) {
      return questionLinkLogic.relatedQuestionLinksCount(question, args, ctx);
    },
    createdAt(question, args, ctx) {
      return questionLogic.createdAt(question, args, ctx);
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
    ponders(user, args, ctx) {
      return userLogic.ponders(user, args, ctx);
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
    },

  },
  QuestionLink: {
    fromQuestion(questionLink, args, ctx) {
      return questionLogic.questionInlink(questionLink.fromId, args, ctx)
    },
    toQuestion(questionLink, args, ctx) {
      return questionLogic.questionInlink(questionLink.toId, args, ctx)
    },
    linkType(questionLink, args, ctx) {
      return questionLinkLogic.linkType(questionLink, args, ctx);
    },
    approval(questionLink, args, ctx) {
      return questionLinkLogic.approval(questionLink, args, ctx);
    },
    approvedByCurrentUser(questionLink, args, ctx) {
      return questionLinkLogic.approvedByCurrentUser(questionLink, args, ctx);
    },
    owner(questionLink, args, ctx) {
      return questionLinkLogic.owner(questionLink, args, ctx);
    }

  },
  QuestionTopicLink: {
    question(questionTopicLink, args, ctx) {
      return questionTopicLinkLogic.question(questionTopicLink, args, ctx);
    },
    topic(questionTopicLink, args, ctx) {
      return questionTopicLinkLogic.topic(questionTopicLink, args, ctx);
    },
    approval(questionTopicLink, args, ctx) {
      return questionTopicLinkLogic.approval(questionTopicLink, args, ctx);
    },
    approvedByCurrentUser(questionTopicLink, args, ctx) {
      return questionTopicLinkLogic.approvedByCurrentUser(questionTopicLink, args, ctx);
    },
    owner(questionTopicLink, args, ctx) {
      return questionTopicLinkLogic.owner(questionTopicLink, args, ctx);
    }
  }
}