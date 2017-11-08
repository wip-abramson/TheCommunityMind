/**
 * Created by will on 07/11/17.
 */
import { Question, How, Why, WhatIf, User, UserStarQuestion } from '../db';
import { authLogic } from './AuthLogic';

export const questionLogic = {
  deleteQuestion(_, { id }, ctx) {
    return authLogic.getAuthenticatedUser(ctx).then((user) => {
      return Question.findOne({
        where: { id },
        include: [{
          model: User,
          where: { id: user.id },
        }],

      }).then(question => question.getUser())
        .then(user => question.removeUser(user))
        .then(() => How.destroy({ where: { id: question.howId } }))
        .then(() => WhatIf.destroy({ where: { id: question.whatIfId } }))
        .then(() => Why.destroy({ where: { id: question.whyId } }))
        .then(() => question.destroy())

    });

  },
  starQuestion(_, { id }, ctx) {
    return authLogic.getAuthenticatedUser(ctx).then((user) => {
      return UserStarQuestion.findOne({
        where: { userId: user.id, questionId: id },
      })
        .then((questionStar) => {
          if (questionStar) {
            questionStar.destroy();
            console.log("destroy Star")
            return null;
          }
          else {
            UserStarQuestion.create({ userId: user.id, questionId: id })
            console.log("Stared Q")
            return Question.findOne({ where: { id: id } });
          }

        })
    })
  },
  user(question) {
    // console.log(question.user)
    return question.getUser();
  },
  staredBy(question) {
    return UserStarQuestion.findAll({
      where: { questionId: question.id },
    })
      .then((questionStars) => {

        return Promise.all(questionStars.map(questionStar => {
          return User.findOne({
            where: { id: questionStar.userId }
          })
            .then((user) => {

              return user;
            })
        }));

      });
  },
  stars(question) {
    // return 0;
    return UserStarQuestion.count({ where: { questionId: question.id } }).then(count => {
      return count;
    })
  },
  staredByCurrentUser (question, args, ctx) {
    return authLogic.getAuthenticatedUser(ctx)
      .then(currentUser => {
        UserStarQuestion.find({
          where: { userId: currentUser.id, questionId: question.id }
        })
          .then(questionStar => {
            return questionStar ? true : false;
          })
      })
      .catch(error => {
        console.log(error);
        return false;
      })
  }

}