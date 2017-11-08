/**
 * Created by will on 07/11/17.
 */
import { Question, UserStarQuestion, UserFollow, User, UserWatchQuestion } from '../db';
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

    return UserStarQuestion.findAll({
      where: { userId: user.id }
    })
      .then(questionStars => {
        return Promise.all(questionStars.map(questionStar => {

          return Question.findOne({ where: { id: questionStar.questionId } })
            .then(question => {
              return question;
            });
        }))
      })
  },

  follows(user, args, ctx) {
    // Again no Auth req
    return UserFollow.findAll({
      where: { followerId: user.id }
    })
      .then(userFollowsRelation => {
        console.log(userFollowsRelation.length)
        return Promise.all(userFollowsRelation.map(userFollowRelation => {
          console.log(userFollowRelation.followedId, "userId")
          return User.findOne({
            where: { id: userFollowRelation.followedId }
          })
            .then(user => {
              return user;
            })
        }));
      })
  },
  followers(user, args, ctx) {
    // Again no Auth req
    return UserFollow.findAll({
      where: { followedId: user.id }
    })
      .then(userFollowsRelation => {
        console.log(userFollowsRelation.length)

        return Promise.all(userFollowsRelation.map(userFollowRelation => {
          console.log(userFollowRelation.followerId, "userId")
          return User.findOne({
            where: { id: userFollowRelation.followerId }
          })
            .then(user => {
              return user;
            })
        }));
      })
  },
  watches(user, args, ctx) {
    return UserWatchQuestion.findAll({
      where: { userId: user.id }
    })
      .then(userWatches => {
        return Promise.all(userWatches.map(userWatch => {
          return Question.findOne({
            where: { id: userWatch.questionId }
          })
            .then(question => {
              return question;
            })
        }))
      })
  }
}