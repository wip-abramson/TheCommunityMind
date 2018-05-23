/**
 * Created by will on 07/11/17.
 */
import { Question, User, Topic } from '../db';
import { authLogic } from './AuthLogic';
import ostUserQueries from '../ost/ostUserQueries';
import ostTransactions from '../ost/ostTransactions';

export const userLogic = {
    jwt(user) {
      return Promise.resolve(user.jwt);
    },
    query(_, { id }, ctx) {
      return User.findById(id)
        .then((user) => {
          return user;
        })
        .catch(error => {
          console.log(error, "Error");
          return Promise.reject(error)
        });
    },
    questions(user, { first, after, last, before }, ctx) {
      return this.userQuestions(user, { userId: user.id, first, after, last, before }, ctx);

    },
    questionsAskedCount(user, args, ctx) {
      return Question.count({
        where: { userId: user.id }
      })
        .then(questionCount => {
          return questionCount;
        })
        .catch(error => {
          console.log(error, "Error");
          return Promise.reject(error)
        })
    },
    starredQuestions(user, { first, after, last, before }, ctx) {
      return this.userStarredQuestions(user, { userId: user.id, first, after, last, before }, ctx);
    },
    questionsStarredCount(user, args, ctx) {
      return Question.count({
        include: [{ model: User, as: "starredBy", where: { id: user.id } }]
      })
        .then(questionCount => {
          return questionCount;
        })
        .catch(error => {
          console.log(error, "Error");
          return Promise.reject(error)
        })
    },

    follows(user, args, ctx) {
      // Again no Auth req
      return User.findAll({
        include: [{ model: User, as: "FollowedBy", where: { id: user.id } }]
      })
        .then(users => {
          return users;
        })
        .catch(error => {
          console.log(error, "Error");
          return Promise.reject(error)
        })
    },
    followsCount(user, args, ctx) {
      return User.count({
        include: [{ model: User, as: "FollowedBy", where: { id: user.id } }]
      })
        .then(users => {
          return users;
        })
        .catch(error => {
          console.log(error, "Error");
          return Promise.reject(error)
        })
    },
    followers(user, args, ctx) {
      // Again no Auth req
      return User.findAll({
        include: [{ model: User, as: "Follower", where: { id: user.id }, }]
      })
        .then(users => {
          return users;
        })
        .catch(error => {
          console.log(error, "Error");
          return Promise.reject(error)
        })
    },
    followersCount(user, args, ctx) {
      return User.count({
        include: [{ model: User, as: "Follower", where: { id: user.id }, }]
      })
        .then(users => {
          return users;
        })
        .catch(error => {
          console.log(error, "Error");
          return Promise.reject(error)
        })
    },
    tipUser(_, { id }, ctx) {

      return authLogic.getAuthenticatedUser(ctx)
        .then(currentUser => {
          if (currentUser.id === id) {
            return Promise.reject("User cannot tip itself")
          }
          return User.findById(id)
            .then(user => {
              console.log("Tip user", user.ostUuid)
              return ostTransactions.executeUserTipTransaction(currentUser.ostUuid, user.ostUuid)
                .then(result => {
                  // console.log(result);
                  return currentUser;
                }).catch(error => {
                  console.log("OST error", error);
                })
            })
        })
        .catch(error => {
          console.log(error, "Error");
          return Promise.reject(error)
        })
    },
    followUser(_, { id }, ctx) {
      return authLogic.getAuthenticatedUser(ctx)
        .then(currentUser => {
          if (currentUser.id === id) {
            return Promise.reject("User cannot follow itself")
          }
          return User.findById(id)
            .then(user => {
              return ostTransactions.executeUserFollowUserTransaction(currentUser.ostUuid, user.ostUuid)
                .then(transaction => {
                  return user.addFollowedBy(currentUser)
                    .then(() => {
                      // console.log(followedUser, "FOLLOWED")
                      return user;
                    })
                })
            })
        })
        .catch(error => {
          console.log(error, "Error");
          return Promise.reject(error)
        })
    },
    unfollowUser(_, { id }, ctx) {
      return authLogic.getAuthenticatedUser(ctx)
        .then(currentUser => {
          if (currentUser.id === id) {
            return Promise.reject("User cannot follow itself")
          }
          return User.findById(id)
            .then(user => {
              return user.removeFollowedBy(currentUser)
                .then(() => {
                  return user;
                })
            })
        })
        .catch(error => {
          console.log(error, "Error");
          return Promise.reject(error)
        })
    },
    followedByCurrentUser(user, args, ctx) {
      return authLogic.getAuthenticatedUser(ctx)
        .then(currentUser => {
          return User.findOne({
            where: { id: user.id },
            include: [{ model: User, as: "FollowedBy", where: { id: currentUser.id } }]
          }).then(user => {
            // console.log(user)
            return user ? true : false;
          })

        })
        .catch(error => {
          return false;
        })

    },
    ponders(user, args, ctx) {
      return authLogic.getAuthenticatedUser(ctx)
        .then(currentUser => {
          if (currentUser.id !== user.id) {
            return Promise.reject("Unauthorized")
          }
          return Question.findAll({
            include: [{ model: User, as: "Ponder", where: { id: user.id } }]
          }).then(questions => {
            return questions;
          })
        })
        .catch(error => {
          console.log(error, "Error");
          return Promise.reject(error)
        })

    },
    interestedIn(user, args, ctx) {
      return authLogic.getAuthenticatedUser(ctx)
        .then(currentUser => {
          if (currentUser.id !== user.id) {
            return Promise.reject("Unauthorized")
          }

          return Topic.findAll({
            include: [{ model: User, where: { id: user.id } }]
          }).then(topics => {
            return topics;
          })
        })
        .catch(error => {
          console.log(error, "Error");
          return Promise.reject(error)
        });
    },
    followTopic(_, { topicId }, ctx) {
      return authLogic.getAuthenticatedUser(ctx)
        .then(currentUser => {
            return ostTransactions.executeFollowTopic(currentUser.ostUuid)
              .then(transaction => {
                return Topic.findById(topicId)
                  .then(topic => {
                    console.log("Follow topic", topic.name)
                    return topic.addUser(currentUser)
                      .then(() => {
                        return topic;
                      });
                  })
              })

          }
        )
        .catch(error => {
          console.log(error, "Error");
          return Promise.reject(error)
        })
    },
    unfollowTopic(_, { topicId }, ctx)
    {
      return authLogic.getAuthenticatedUser(ctx)
        .then(currentUser => {

          // Should I check that Topic is already associated with user?
          return Topic.findById(topicId)
            .then(topic => {
              return currentUser.removeTopic(topic)
                .then(() => {
                  return topic;
                })

            })
        })
        .catch(error => {
          console.log(error, "Error");
          return Promise.reject(error)
        })

    }
    ,
    userStarredQuestions(_, { userId, first, after, last, before }, ctx)
    {
      const args = {};

      // add one to the limit in case only Why, WhatIf or How contains all the Q's
      args.limit = (first || last) + 1;

      const where = {};
      // because we return messages from newest -> oldest
      // before actually means newer (id > cursor)
      // after actually means older (id < cursor)
      args.order = [['createdAt', 'DESC']];

      if (before) {
        // convert base-64 to utf8 createdAt
        where.id = { $gt: Buffer.from(before, 'base64').toString() };
        args.order = [['createdAt', 'ASC']]

      }
      if (after) {
        where.id = { $lt: Buffer.from(after, 'base64').toString() };
        // console.log(args.where.id);
      }

      // const args = paginationLogic.buildArgs(first, after, last, before);
      args.include = [{ model: User, as: "starredBy", where: { id: userId } }];

      return Question.findAll(args).then(questions => paginate(first, after, last, before, questions));

    }
    ,
    userQuestions(_, { userId, first, after, last, before }, ctx)
    {
      const args = {};
      args.limit = (first || last) + 1;
      //
      const where = {};
      // because we return messages from newest -> oldest
      // before actually means newer (id > cursor)
      // after actually means older (id < cursor)
      args.order = [['createdAt', 'DESC']];

      if (before) {
        // convert base-64 to utf8 createdAt
        where.id = { $gt: Buffer.from(before, 'base64').toString() };
        args.order = [['createdAt', 'ASC']]

      }
      if (after) {
        where.id = { $lt: Buffer.from(after, 'base64').toString() };
        console.log(where.id, "WHERE");
      }
      console.log(userId);
      where.userId = userId;

      args.where = where;

      return Question.findAll(args).then(questions => paginate(first, after, last, before, questions));
    }
    ,
// TODO Having to call ostUserQuery twice is there a way to simplify???
    totalOstBalance(user, args, ctx)
    {
      return authLogic.getAuthenticatedUser(ctx)
        .then(authorisedUser => {
          if (authorisedUser && authorisedUser.id === user.id) {
            return ostUserQueries.getUser(user.ostUuid)
              .then(ostUser => {
                if (!ostUser) {
                  throw new Error('Unable to fetch ost user with uuid: ' + user.ostUuid);
                }
                return Math.floor(ostUser.token_balance);
              })
          }
          else {
            throw new Error('Unauthorized to view users balance');
          }
        })
        .catch(error => {
          throw new Error('Unable to fetch ost user with uuid: ' + user.ostUuid);
        })

    }
    ,
    totalAirdroppedBalance(user, args, ctx)
    {
      return authLogic.getAuthenticatedUser(ctx)
        .then(authorisedUser => {
          if (authorisedUser && authorisedUser.id === user.id) {
            console.log("Authorized")
            return ostUserQueries.getUser(user.ostUuid, user.username)
              .then(ostUser => {
                if (!ostUser) {
                  console.log('No User')
                  throw new Error('Unable to fetch ost user with uuid: ' + user.ostUuid);
                }
                return ostUser.total_airdropped_tokens;
              })
          }
          else {
            throw new Error('Unauthorized to view users balance');
          }
        })
        .catch(error => {
          console.log("Error", error);
          throw new Error('Unable to fetch ost user with uuid: ' + user.ostUuid);
        })

    }

  }
;

function paginate(first, after, last, before, questions) {

  let hasNextPage = false;
  let hasPreviousPage = false;
  let limitedItems = [];

  const itemLimit = first || last;

  if (before) {

    if (questions.length - itemLimit > 0) {
      hasPreviousPage = true;
    }

    hasNextPage = true;

    limitedItems = questions.slice(hasPreviousPage ? questions.length - itemLimit : 0, questions.length);

  }
  else if (after) {

    // not quite right
    hasPreviousPage = true;

    if (itemLimit < questions.length) {
      hasNextPage = true;
    }

    limitedItems = questions.slice(0, itemLimit);

  }
  else {

    limitedItems = questions.slice(0, itemLimit);

    if (itemLimit < questions.length) {
      hasNextPage = true;
    }

  }
  console.log(limitedItems.length, "LIMITEMS")
  var edges = limitedItems.map(node => ({
    cursor: Buffer.from(node.id.toString()).toString('base64'), // convert question id to cursor
    node
  }));

  return {
    edges,
    pageInfo: {
      hasPreviousPage: () => hasPreviousPage,
      hasNextPage: () => hasNextPage
    }
  }
}