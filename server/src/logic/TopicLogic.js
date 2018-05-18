/**
 * Created by will on 08/11/17.
 */
import { Tag, User, Question } from '../db';
import { authLogic } from './AuthLogic';

export const topicLogic = {
  query(_, { name }, ctx) {
    return Tag.findAll({
      // where: {
      //   name,
      // }
    })
      .then(tags => {
        return tags;
      })
      .catch(error => {
        console.log(error, "Error");
        return Promise.reject(error)
      })
  },
  topTopics(_, args, ctx) {
    return authLogic.getAuthenticatedUser(ctx)
      .then(user => {
        return Tag.findAll({
          include: [{ model: User, where: { id: user.id } }]
        })
          .then(tags => {
            return rankedTags(tags);
          })
      })
      .catch(error => {
        console.log("No User Logged in, Returning top general topics");
        return Tag.findAll()
          .then(tags => {
            return rankedTags(tags);
          })
      })
  },
  findOrCreateTopic(_, { name }, ctx) {
    return authLogic.getAuthenticatedUser(ctx)
      .then(user => {
        return Tag.findOrCreate({
          where: { name: name.substr(0,1).toUpperCase() + name.substr(1).toLowerCase() }
        })
          .then(tag => {
            console.log(tag[0].name)
            return tag[0];
          })
      })
      .catch(error => {
        console.log(error, "Error");
        return Promise.reject(error)
      })

  },
  followers(tag, args, ctx) {
    // Undecided if I need this - should users be able to see which users follow what?
    return User.findAll({
      include: [{ model: Tag, as: "Followers", where: { id: tag.id } }]
    })
      .then(users => {
        return users
      })
      .catch(error => {
        console.log(error, "Error");
        return Promise.reject(error)
      })
  },
  questions(tag, args, ctx) {
    return Question.findAll({
      include: [{ model: Tag, as: "Questions", where: { id: tag.id } }]
    })
      .then(questions => {
        return questions;
      })
      .catch(error => {
        console.log(error, "Error");
        return Promise.reject(error)
      })
  },
  numberOfFollowers(tag, args, ctx) {
    return User.count({
      include: [{ model: Tag, as: "Followers", where: { id: tag.id } }]
    })
      .then(count => {
        return count;
      })
      .catch(error => {
        console.log(error, "Error");
        return Promise.reject(error)
      })
  }
}

const rankedTags = (tags) => {

  const tagLimit = 5;
  if (!tags) {
    return [];
  }
  return Promise.all(tags.map(tag => {
    return User.count({
      include: [{ model: Tag, where: { id: tag.id } }]
    })
      .then(numberOfFollowers => {
        return Question.count({
          include: [{ model: Tag, where: { id: tag.id } }]
        })
          .then(numberOfQuestions => {
            return {
              tag: tag,
              // work out the tag ranking number atm just add the two numbers
              tagRanking: numberOfQuestions + numberOfFollowers
            }
          })

      })
  }))

    .then(calculatedTags => {
      calculatedTags.forEach((calcTag => console.log("TAG RANKING", calcTag.tagRanking, calcTag.tag.name)));
      calculatedTags.sort((a, b) => {

        return b.tagRanking - a.tagRanking;
      })
      var topTags = calculatedTags.slice(0, tagLimit);

      return topTags.map(topTag => topTag.tag);
    })

}