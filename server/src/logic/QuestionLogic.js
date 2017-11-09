/**
 * Created by will on 07/11/17.
 */
import { Question, How, Why, WhatIf, User, Tag } from '../db';
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
    return authLogic.getAuthenticatedUser(ctx)
      .then((user) => {
        return Question.findOne({
          include: [{ model: User, as: "StaredBy", where: { id: user.id } }]
        })
          .then(question => {
            if (question) {
              question.removeUser(user, { as: "StaredBy" });
              console.log("destroy Star")
              return null;
            }
            else {
              question.addUser(user, { as: "StaredBy" });
              console.log("Stared Q")
              return question;
            }
          })

      })
  },
  user(question) {
    // console.log(question.user)
    return question.getUser();
  },
  staredBy(question) {
    return User.findAll({

      include: [{ model: Question, as: "StaredBy", where: { id: question.id }, }]
    })
      .then(users => {
        return users;
      })

  },
  stars(question) {
    // return 0;
    return User.count({
      include: [{
        model: Question,
        where: { id: question.id }
      }]
    }).then(count => {
      return count;
    })
  },
  staredByCurrentUser (question, args, ctx) {
    return authLogic.getAuthenticatedUser(ctx)
      .then(currentUser => {
        User.find({
          where: { id: currentUser.id },
          include: [{ model: Question, where: { id: question.id } }]
        })
          .then(user => {
            return user ? true : false;
          })
      })
      .catch(error => {
        console.log(error);
        return false;
      })
  },
  associatedWith(question, args, ctx) {
    return Tag.findAll({
      include: [{ model: Question, where: { id: question.id } }]
    })
      .then(tags => {
        return tags;
      })
  },
  associateWithTag(_, { questionId, tagId }, ctx) {
    return authLogic.getAuthenticatedUser(ctx)
      .then(user => {
        return Question.findById(questionId).then(question => {
          return Tag.findById(tagId)
            .then(tag => {
              question.addTag(tag);
              return question;
            })
        })
      })
  }

}