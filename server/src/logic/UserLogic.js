/**
 * Created by will on 07/11/17.
 */
import { Question, User } from '../db';
import { authLogic } from './AuthLogic';

export const userLogic = {
  jwt(user) {
    return Promise.resolve(user.jwt);
  },
  questions(user, args, ctx) {
    return authLogic.getAuthenticatedUser(ctx)
      .then((currentUser) => {
        if (currentUser.id !== user.id) {
          return Promise.reject('Unauthorized');
        }
        return Question.findAll({
          where: { userId: user.id },
          order: [['createdAt', 'DESC']],
        });
      });
  },
  staredQuestions(user, args, ctx) {
    // No Auth needed because everyone should be able to see a users stared questions
    return Question.findAll({
      where: { userId: user.id },
      include: [{ model: User, as: "StaredQuestion" }]
    })
  },

  follows(user, args, ctx) {
    // Again no Auth req
    return User.findAll({
      include: [{ model: User, as: "Followed", where: {id: user.id} }]
    }).then(users => {
      return users;
    })
  },
  followers(user, args, ctx) {
    // Again no Auth req
    return User.findAll({
      include: [{ model: User, as: "Follower", where: { id: user.id } }]
    }).then(users => {
      return users;
    })
  },
  watches(user, args, ctx) {
    return Question.findAll({
      include: [{ model: User, as: "Watched", where: { id: user.id } }]
    }).then(questions => {
      return questions;
    })
  }
}