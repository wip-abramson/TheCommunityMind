/**
 * Created by will on 08/11/17.
 */
import { Tag, User, Question } from '../db';

export const tagLogic = {
  query(_, { name }, ctx) {
    return Tag.findAll({
      where: {
        name,
      }
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
  },
  questions(tag, args, ctx) {
    return Question.findAll({
      include: [{ model: Tag, as: "Questions", where: { id: tag.id } }]
    })
      .then(questions => {
        return questions;
      })
  },
  numberOfFollowers(tag, args, ctx) {
    return User.count({
      include: [{ model: Tag, as: "Followers", where: { id: tag.id } }]
    })
      .then(count => {
        return count;
      })
  }
}