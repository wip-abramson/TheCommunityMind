/**
 * Created by will on 08/11/17.
 */
import { Topic, User, Question } from '../db';
import { authLogic } from './AuthLogic';

export const topicLogic = {
  query(_, { name }, ctx) {
    return Topic.findAll({
      // where: {
      //   name,
      // }
    })
      .then(topics => {
        return topics;
      })
      .catch(error => {
        console.log(error, "Error");
        return Promise.reject(error)
      })
  },
  topTopics(_, args, ctx) {
    return authLogic.getAuthenticatedUser(ctx)
      .then(user => {
        return Topic.findAll({
          include: [{ model: User, where: { id: user.id } }]
        })
          .then(topics => {
            return rankedTopics(topics);
          })
      })
      .catch(error => {
        console.log("No User Logged in, Returning top general topics");
        return Topic.findAll()
          .then(topics => {
            return rankedTopics(topics);
          })
      })
  },
  findOrCreateTopic(_, { name }, ctx) {
    return authLogic.getAuthenticatedUser(ctx)
      .then(user => {
        return Topic.findOrCreate({
          where: { name: name.substr(0,1).toUpperCase() + name.substr(1).toLowerCase() }
        })
          .then(topics => {
            console.log(topics[0].name)
            return topics[0];
          })
      })
      .catch(error => {
        console.log(error, "Error");
        return Promise.reject(error)
      })

  },
  followers(topic, args, ctx) {
    // Undecided if I need this - should users be able to see which users follow what?
    return User.findAll({
      include: [{ model: Topic, as: "Followers", where: { id: topic.id } }]
    })
      .then(users => {
        return users
      })
      .catch(error => {
        console.log(error, "Error");
        return Promise.reject(error)
      })
  },
  questions(topic, args, ctx) {
    return Question.findAll({
      include: [{ model: Topic, as: "Questions", where: { id: topic.id } }]
    })
      .then(questions => {
        return questions;
      })
      .catch(error => {
        console.log(error, "Error");
        return Promise.reject(error)
      })
  },
  numberOfFollowers(topic, args, ctx) {
    return User.count({
      include: [{ model: Topic, as: "Followers", where: { id: topic.id } }]
    })
      .then(count => {
        return count;
      })
      .catch(error => {
        console.log(error, "Error");
        return Promise.reject(error)
      })
  },
  followedByCurrentUser(topic, args, ctx) {
    return authLogic.getAuthenticatedUser(ctx)
      .then(currentUser => {
        return Topic.findOne({
          where: { id: topic.id },
          include: [{ model: User, as: "FollowedBy", where: { id: currentUser.id } }]
        }).then(user => {
          return !!user;
        })

      })
      .catch(error => {
        return false;
      })
  }
};

const rankedTopics = (topics) => {

  const topicLimit = 5;
  if (!topics) {
    return [];
  }
  return Promise.all(topics.map(topic => {
    return User.count({
      include: [{ model: Topic, where: { id: topic.id } }]
    })
      .then(numberOfFollowers => {
        return Question.count({
          include: [{ model: Topic, where: { id: topic.id } }]
        })
          .then(numberOfQuestions => {
            return {
              topic: topic,
              // work out the topic ranking number atm just add the two numbers
              topicRanking: numberOfQuestions + numberOfFollowers
            }
          })

      })
  }))

    .then(calculatedTopics => {
      calculatedTopics.forEach((calcTopic => console.log("TOPIC RANKING", calcTopic.topicRanking, calcTopic.topic.name)));
      calculatedTopics.sort((a, b) => {

        return b.topicRanking - a.topicRanking;
      })
      var topTopics = calculatedTopics.slice(0, topicLimit);

      return topTopics.map(topTopic => topTopic.topic);
    })

}