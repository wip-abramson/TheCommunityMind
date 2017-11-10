/**
 * Created by will on 07/11/17.
 */
import { Question, How, Why, WhatIf, User, Tag } from '../db';
import { authLogic } from './AuthLogic';

export const questionLogic = {
  deleteQuestion(_, { id }, ctx) {
    return authLogic.getAuthenticatedUser(ctx)
      .then((user) => {
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

      })
      .catch(error => {
        console.log(error, "Error");
        return Promise.reject(error)
      });

  },
  starQuestion(_, { id }, ctx) {
    return authLogic.getAuthenticatedUser(ctx)
      .then((user) => {
        return Question.findOne({
          where: { id: id },
          include: [{ model: User, as: "StaredBy", where: { id: user.id } }]
        })
          .then(question => {
            if (question) {
              question.removeStaredBy(user).then(() => {
                console.log("destroy Star")
                return question;
              });

            }
            else {
              return Question.findById(id).then(unstaredQuestion => {
                console.log("Stared Q")
                return unstaredQuestion.addStaredBy(user).then(() => {
                  return unstaredQuestion;
                });

              })

            }
          })

      })
      .catch(error => {
        console.log(error, "Error");
        return Promise.reject(error)
      })
  },
  user(question) {
    return question.getUser();
  },
  staredBy(question) {
    return User.findAll({
      include: [{ model: Question, as: "StaredBy", where: { id: question.id }, }]
    })
      .then(users => {
        return users;
      })
      .catch(error => {
        console.log(error, "Error");
        return Promise.reject(error)
      })

  },
  stars(question) {
    // return 0;
    return User.count({
      include: [{
        model: Question,
        as: "StaredBy",
        where: { id: question.id }
      }]
    })
      .then(count => {
        return count;
      })
      .catch(error => {
        console.log(error, "Error");
        return Promise.reject(error)
      })
  },
  staredByCurrentUser (question, args, ctx) {
    return authLogic.getAuthenticatedUser(ctx)
      .then(currentUser => {
        return User.findOne({
          where: { id: currentUser.id },
          include: [{ model: Question, as: "StaredBy", where: { id: question.id } }]
        })
          .then(user => {
            console.log(user === null, "user found")
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
  associateQuestionWithTag(_, { questionId, tagId }, ctx) {
    return authLogic.getAuthenticatedUser(ctx)
      .then(user => {
        return Question.findById(questionId)
          .then(question => {
            console.log(question.userId, user.id)

            if (question.userId !== user.id) {
              return Promise.reject("Unauthorized");
            }
            return Tag.findById(tagId)
              .then(tag => {
                return question.addTag(tag)
                  .then(() => {
                    return tag
                  });
              })
          })
      })
      .catch(error => {
        console.log(error, "Error");
        return Promise.reject(error)
      });
  },
  removeTagAssociationWithQuestion(_, { questionId, tagId }, ctx) {
    return authLogic.getAuthenticatedUser(ctx)
      .then(user => {
        return Question.findById(questionId)
          .then(question => {
            console.log(question.userId, user.id)
            if (question.userId !== user.id) {
              return Promise.reject("Unauthorized");
            }

            // Should I check if Tag is already associated? Probably
            return Tag.findById(tagId)
              .then(tag => {
                return question.removeTag(tag)
                  .then(() => {
                    return tag
                  });
              })
          })
      })
      .catch(error => {
        console.log(error, "Error");
        return Promise.reject(error)
      });
  }

}