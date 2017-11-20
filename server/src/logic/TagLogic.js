/**
 * Created by will on 08/11/17.
 */
import { Tag, User, Question } from '../db';
import { authLogic } from './AuthLogic';

export const tagLogic = {
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
  findOrCreateTag(_, { name }, ctx) {
    return authLogic.getAuthenticatedUser(ctx)
      .then(user => {
        return Tag.findOrCreate({
          where: { name: name.toLowerCase() }
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