/**
 * Created by will on 07/11/17.
 */
import { Question, User, Topic, QuestionTopicLink } from '../db';
import { authLogic } from './AuthLogic';
import { paginationLogic } from './PaginationLogic';
import { questionTopicLinkLogic } from './QuestionTopicLinkLogic'
import ostTransactions from '../ost/ostTransactions';

export const questionLogic = {
  createQuestion(_, { questionText, parentId }, ctx) {
    console.log('CREATE Q')
    return authLogic.getAuthenticatedUser(ctx)
      .then(user => {
        ostTransactions.executeQuestionTransaction(user.ostUuid).then(transactionHash => {
          console.log(transactionHash);
        });
        return Question.create({
          questionText,
          stars: 0,
          userId: user.id,
          parentId

        })
      });
  },
  // TODO not sure we need this
  deleteQuestion(_, { id }, ctx) {
    return authLogic.getAuthenticatedUser(ctx)
      .then((user) => {
        return Question.findOne({
          where: { id: id },
          include: [{
            model: User,
            where: { id: user.id },
          }],
        })
        // no need to delete associations, they are automatically deleted on delete
          .then(question => {
              if (!question) {
                return Promise.reject("Unauthorized")
              }
              return question.destroy()
                .then(destroyedQ => {
                  return destroyedQ;
                });

            }
          )
      })
      .catch(error => {
        console.log(error, "Error");
        return Promise.reject(error)
      });

  },
  // TODO this should be replaced with a rewording link
  editQuestion(_, { id, newQuestionText }, ctx) {
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
            return questionToEdit.update({ questionText: newQuestionText })
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
              return Promise.reject("Question not stared by current user");
            }
          })
      })
      .catch(error => {
        console.log(error, "Error");
        return Promise.reject(error)
      })
  },
  ponderQuestion(_, { id }, ctx) {
    return authLogic.getAuthenticatedUser(ctx)
      .then(user => {
        return Question.findById(id)
          .then(question => {
            return user.addPonder(question)
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
  unponderQuestion(_, { id }, ctx) {
    return authLogic.getAuthenticatedUser(ctx)
      .then(user => {
        return Question.findOne({
          where: { id: id },
          include: [{ model: User, as: "Ponder", where: { id: user.id } }]
        })
          .then(question => {
            if (!question) {
              return Promise.reject("User is not pondering this question")
            }
            return user.removePonder(question)
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
  ponderCount(question, args, ctx) {
    return User.count({
      include: [{
        model: Question,
        as: "Ponder",
        where: {id: question.id}
      }]
    })
  },
  ponderedByCurrentUser(question, args, ctx) {
    return authLogic.getAuthenticatedUser(ctx)
      .then(user => {
        return Question.findOne({
          where: { id: question.id },
          include: [{ model: User, as: "Ponder", where: { id: user.id } }]
        })
          .then(question => {
            return !!question;
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
            return !!question;
          })
      })
      .catch(error => {
        console.log(error);
        return false;
      })
  },
  createdAt(question, args, ctx) {
    const inputDate = question.createdAt;
    const todaysDate = new Date();
    // TODO make much nicer
    if(inputDate.setHours(0,0,0,0) === todaysDate.setHours(0,0,0,0)) {
      if(todaysDate.getMinutes() === inputDate.getMinutes()) {
        return "Just Now";
      }
      else if(todaysDate.getHours() === inputDate.getHours()) {
        return todaysDate.getMinutes() - inputDate.getMinutes() + " Minutes ago";

      }
    }

      return question.createdAt.toDateString();
  },
  linksToTopics(question, {first, after, last, before}, ctx) {
    const args =paginationLogic.buildArgs(first, after, last, before);

    args.include = [{ model: Question, where: { id: question.id } }];
    return questionTopicLinkLogic.buildPaginatedQuestionTopicLinks(args, before);
  },
  linkQuestionWithTopic(_, { questionId, topicId }, ctx) {
    return authLogic.getAuthenticatedUser(ctx)
      .then(user => {
        return Question.findById(questionId)
          .then(question => {
            return Topic.findOne({
              where: { id: topicId },
              include: [{
                model: QuestionTopicLink,
                where: { questionId: question.id }
              }],

            })
              .then(topic => {
                if (topic) {
                  console.log("Approve Link")
                  topic.addQuestionTopicUserApproval(question).then(() => topic);
                }
                else {
                  return question.addTopic(topic)
                    .then(() => {
                    // TODO do I want to return a topic here - WHY?
                      return topic
                    });
                }

              })
          })
      })
      .catch(error => {
        console.log(error, "Error");
        return Promise.reject(error)
      });
  },
  // TODO I dont think I need this anymore!
  removeTopicLinkFromQuestion(_, { questionId, topicId }, ctx) {
    return authLogic.getAuthenticatedUser(ctx)
      .then(user => {
        return Question.findById(questionId)
          .then(question => {
            console.log(question.userId, user.id)
            if (question.userId !== user.id) {
              return Promise.reject("Unauthorized");
            }

            // Should I check if Topic is already associated? Probably
            return Topic.findById(topicId)
              .then(topic => {
                return question.removeTopic(topic)
                  .then(() => {
                    return topic
                  });
              })
          })
      })
      .catch(error => {
        console.log(error, "Error");
        return Promise.reject(error)
      });
  },
  questionQuery(_, { questionId }, ctx)  {
    return Question.findById(questionId);
  },
  questionInlink(id, args, ctx) {
    return Question.findById(id);
  },
  query(_, { first, after, last, before }, ctx) {
    const args = paginationLogic.buildArgs(first, after, last, before);

    return this.buildPaginatedQuestions(args, before)
  },
  buildPaginatedQuestions(args, before) {
    return Question.findAll(args)
      .then(questions => {
        const edges = questions.map(question => {
          return ({
            cursor: Buffer.from(question.id.toString()).toString('base64'), // convert id to cursor
            node: question
          })
        });
        // if no whatifs then no next or prev page
        if (questions.length === 0) {
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
  },

}