/**
 * Created by will on 07/11/17.
 */
import { Question, User, Tag } from '../db';
import { authLogic } from './AuthLogic';
import { paginationLogic } from './PaginationLogic';

export const questionLogic = {
  createQuestion(_, { questionText, parentId }, ctx) {
    return authLogic.getAuthenticatedUser(ctx)
      .then(user => {
        return Question.create({
          questionText,
          stars: 0,
          userId: user.id,
          parentId

        })
      });
  },
  deleteQuestion(_, { id }, ctx) {
    return authLogic.getAuthenticatedUser(ctx)
      .then((user) => {
        return Question.findById({
          where: { id },
          include: [{
            model: User,
            where: { id: user.id },
          }],
        })
        // destroy the How WhatIf or Why that owns the question - cannot have any without a question
        // no need to delete associations, they are automatically deleted on delete
          .then(question => {
              if (!question) {
                return Promise.reject("Unauthorized")
              }
              return How.destroy({ where: { id: question.howId } })
                .then(() => Why.destroy({ where: { id: question.whyId } }))
                .then(() => WhatIf.destroy({ where: { id: question.whatIfId } }))
                // then finally destroy the question
                .then(() => question.destroy()
                  .then(destroyedQ => {
                    return destroyedQ;
                  }))
            }
          )
      })
      .catch(error => {
        console.log(error, "Error");
        return Promise.reject(error)
      });

  },
  editQuestion(_, { id, newQuestion }, ctx) {
    return authLogic.getAuthenticatedUser(ctx)
      .then(user => {
        return Question.findOne({
          where: { id },
          include: [{
            model: User,
            where: { id: user.id },
          }],
        })
          .then(questionToEdit => {
            if (!questionToEdit) {
              return Promise.reject("Unauthorized")
            }
            return questionToEdit.update({ question: newQuestion })
              .then(updatedQuestion => {
                return updatedQuestion
              })
          })
      })
      .catch(error => {
        console.log(error, "Error");
        return Promise.reject(error)
      })
  },
  starQuestion(_, { id }, ctx) {
    return authLogic.getAuthenticatedUser(ctx)
      .then((user) => {
        return Question.findById(id).then(unstaredQuestion => {
          console.log("Stared Q")
          return unstaredQuestion.addStarredBy(user).then(() => {
            return unstaredQuestion;
          });
        })
      })
      .catch(error => {
        console.log(error, "Error");
        return Promise.reject(error)
      })
  },
  unstarQuestion(_, { id }, ctx) {
    return authLogic.getAuthenticatedUser(ctx)
      .then((user) => {
        return Question.findOne({
          where: { id: id },
          include: [{ model: User, as: "StarredBy", where: { id: user.id } }]
        })
          .then(question => {
            if (question) {
              return question.removeStarredBy(user).then(() => {
                console.log("destroy StarIcon")
                return question;
              });
            }
            else {
              Promise.reject("Question not stared by current user");
            }
          })
      })
      .catch(error => {
        console.log(error, "Error");
        return Promise.reject(error)
      })
  },
  watchQuestion(_, { id }, ctx) {
    return authLogic.getAuthenticatedUser(ctx)
      .then(user => {
        return Question.findById(id)
          .then(question => {
            return user.addWatched(question)
              .then(() => {
                return question;
              })
          })
      })
      .catch(error => {
        console.log(error, "Error");
        return Promise.reject(error)
      })
  },
  unwatchQuestion(_, { id }, ctx) {
    return authLogic.getAuthenticatedUser(ctx)
      .then(user => {
        return Question.findOne({
          where: { id: id },
          include: [{ model: User, as: "Watched", where: { id: user.id } }]
        })
          .then(question => {
            if (!question) {
              return Promise.reject("User is not watching this question")
            }
            return user.removeWatched(question)
              .then(() => {
                return question;
              })
          })
      })
  },
  user(question) {
    return question.getUser();
  },
  starredBy(question) {
    return User.findAll({
      include: [{ model: Question, as: "StarredBy", where: { id: question.id }, }]
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
        as: "StarredBy",
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
  starredByCurrentUser (question, args, ctx) {
    return authLogic.getAuthenticatedUser(ctx)
      .then(currentUser => {
        return User.findOne({
          where: { id: currentUser.id },
          include: [{ model: Question, as: "StarredBy", where: { id: question.id } }]
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
  watchedByCurrentUser(question, args, ctx) {
    return authLogic.getAuthenticatedUser(ctx)
      .then(user => {
        return Question.findOne({
          where: { id: question.id },
          include: [{ model: User, as: "Watched", where: { id: user.id } }]
        })
          .then(question => {
            return question ? true : false;
          })
      })
      .catch(error => {
        console.log(error);
        return false;
      })
  },
  ownedByCurrentUser(question, args, ctx) {
    return authLogic.getAuthenticatedUser(ctx)
      .then(user => {
        return Question.findOne({
          where: { id: question.id, userId: user.id },
        })
          .then(question => {
            return question ? true : false;
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
  },
  parentQuestions(question, { first, before, last, after }, ctx) {
    const args = paginationLogic.buildArgs(first, after, last, before);
    args.include = [{ model: Question, as: "ChildQuestion", where: { id: question.id }, }]

    return this.buildPaginatedQuestions(args, before)

  },
  childQuestions(question, {  whyId, first, after, last, before }, ctx) {
    const args = paginationLogic.buildArgs(first, after, last, before);
    args.include = [{ model: Question, as: "ParentQuestion", where: { id: question.id }, }]

    return this.buildPaginatedQuestions(args, before)
  },
  query(_, { first, after, last, before }, ctx) {
    const args = paginationLogic.buildArgs(first, after, last, before);

    return this.buildPaginatedQuestions(args, before)
  },
  buildPaginatedQuestions(args, before) {
    return Question.findAll(args)
      .then(questions => {
        const edges = questions.map(question => {

          return  ({
            cursor: Buffer.from(question.id.toString()).toString('base64'), // convert id to cursor
            node: question
          })
        });
        // if no whatifs then no next or prev page
        if(questions.length === 0) {
          return {
            edges,
            pageInfo: {
              hasNextPage() {
                return false;
              },
              hasPreviousPage() {
                return false;
              }
            }
          }
        }

        args.where.id = {
          [before ? '$gt' : '$lt']: questions[questions.length - 1].id,
        };

        return {
          edges,
          pageInfo: {
            hasNextPage () {
              if (questions.length < args.limit) {
                return Promise.resolve(false);
              }
              return Question.findOne(args)
                .then(question => !!question);
            },
            hasPreviousPage  () {
              return Question.findOne(args)
                .then(question => !!question);
            }
          }
        }
      })
      .catch(error => {
        console.log(error, "Error");
        return Promise.reject(error)
      })
  }

}