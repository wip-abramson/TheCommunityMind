/**
 * Created by will on 07/11/17.
 */
import { Question, User, Tag } from '../db';
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

      include: [{ model: User, as: "StaredBy", where: { id: user.id } }]
    })
  },

  follows(user, args, ctx) {
    // Again no Auth req
    // return user.getFollowers();
    return User.findAll({
      include: [{ model: User, as: "FollowedBy", where: {id: user.id} }]
    }).then(users => {
      return users;
    })
  },
  followers(user, args, ctx) {
    // Again no Auth req
    // console.log(user, "followedId")
    return User.findAll({

      include: [{ model: User, as: "Follower",where: {id: user.id},}]
    }).then(users => {
      return users;
    })
  },
  watches(user, args, ctx) {
    // need auth
    return Question.findAll({
      include: [{ model: User, as: "Watched", where: { id: user.id } }]
    }).then(questions => {
      return questions;
    })
  },
  interestedIn(user, args, ctx) {
    return authLogic.getAuthenticatedUser(ctx)
      .then(currentUser => {
        if (currentUser.id !== user.id) {
          return Promise.reject("Unauthorized")
        }

        return Tag.findAll({
          include: [{model: User, as: "InterestedIn", where: { id: user.id }}]
        })
      })
  }
}