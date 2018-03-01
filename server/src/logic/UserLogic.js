/**
 * Created by will on 07/11/17.
 */
import { Question, User, Tag } from '../db';
import { authLogic } from './AuthLogic';
import { paginationLogic } from './PaginationLogic';

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
  staredQuestions(user, { first, after, last, before }, ctx) {
    return this.userStaredQuestions(user, { userId: user.id, first, after, last, before }, ctx);
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
  followUser(_, { id }, ctx) {
    return authLogic.getAuthenticatedUser(ctx)
      .then(currentUser => {
        if (currentUser.id === id) {
          return Promise.reject("User cannot follow itself")
        }
        return User.findById(id)
          .then(user => {
            return user.addFollowedBy(currentUser)
              .then(() => {
                // console.log(followedUser, "FOLLOWED")
                return user;
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
  watches(user, args, ctx) {
    return authLogic.getAuthenticatedUser(ctx)
      .then(currentUser => {
        if (currentUser.id !== user.id) {
          return Promise.reject("Unauthorized")
        }
        return Question.findAll({
          include: [{ model: User, as: "Watched", where: { id: user.id } }]
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

        return Tag.findAll({
          include: [{ model: User, where: { id: user.id } }]
        }).then(tags => {
          return tags;
        })
      })
      .catch(error => {
        console.log(error, "Error");
        return Promise.reject(error)
      });
  },
  addUserInterest(_, { userId, tagId }, ctx) {
    return authLogic.getAuthenticatedUser(ctx)
      .then(currentUser => {

        // not sure if there is a better way but comparing userId to currentUser.id wasn't working
        return User.findById(userId)
          .then(user => {
            if (currentUser.id !== user.id) {
              return Promise.reject("Unauthorized");
            }

            return Tag.findById(tagId)
              .then(tag => {
                return currentUser.addTag(tag)
                  .then(() => {
                    return tag;
                  });
              })
          })
      })
      .catch(error => {
        console.log(error, "Error");
        return Promise.reject(error)
      })
  },
  removeUserInterest(_, { userId, tagId }, ctx) {
    return authLogic.getAuthenticatedUser(ctx)
      .then(currentUser => {
        return User.findById(userId)
          .then(user => {
            if (currentUser.id !== user.id) {
              console.log("Unauth")
              return Promise.reject("Unauthorized");
            }

            // Should I check that Tag is already associated with user?
            return Tag.findById(tagId)
              .then(tag => {
                return currentUser.removeTag(tag)
                  .then(() => {
                    return tag;
                  })

              })
          })
      })
      .catch(error => {
        console.log(error, "Error");
        return Promise.reject(error)
      })

  },
  userWhys(_, { userId, first, after, last, before }, ctx) {

    const args = paginationLogic.buildArgs(first, after, last, before);
    args.include = [{ model: Question, where: { userId: userId } }];

    return whyLogic.buildPaginatedWhys(args, before);

  },
  userWhatIfs(_, { userId, first, after, last, before }, ctx) {
    const args = paginationLogic.buildArgs(first, after, last, before);
    args.include = [{ model: Question, where: { userId: userId } }];

    return whatIfLogic.buildPaginatedWhatIfs(args, before)
  },
  userHows(_, { userId, first, after, last, before }, ctx) {
    const args = paginationLogic.buildArgs(first, after, last, before);
    args.include = [{ model: Question, where: { userId: userId } }];

    return howLogic.buildPaginatedHows(args, before)
  },
  userStaredQuestions(_, { userId, first, after, last, before }, ctx) {
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
    args.include = [{
      model: Question,
      where: where,
      include: [{ model: User, as: "StaredBy", where: { id: userId } }]
    }];

    return findAllQuestions(args)
      .then(allQuestions => paginate(first, after, last, before, allQuestions))

      .catch(error => {
        console.log(error, "Error");
        return Promise.reject(error)
      })
  },
  userQuestions(_, { userId, first, after, last, before }, ctx) {

    const args = {};
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
      console.log(where.id, "WHERE");
    }
    where.userId = userId;
    args.include = [{ model: Question, where: where, order: [['createdAt', 'DESC']] }];

    return findAllQuestions(args)
      .then(allQuestions => paginate(first, after, last, before, allQuestions))

      .catch(error => {
        console.log(error, "Error");
        return Promise.reject(error)
      });
  }

};

function paginate(first, after, last, before, questions) {

  var hasNextPage = false;
  var hasPreviousPage = false;
  var limitedItems = [];

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
    cursor: Buffer.from(node.question.id.toString()).toString('base64'), // convert question id to cursor
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

function findAllQuestions(args) {
  return Why.findAll(args)
    .then(whys => {
      return WhatIf.findAll(args)
        .then(whatIfs => {
          return How.findAll(args)
            .then(hows => {
              var allQuestions = whys.concat(whatIfs, hows);

              // console.log(allQuestions.length);
              allQuestions.sort((a, b) => {
                a = new Date(a.question.id);
                b = new Date(b.question.id);
                return a > b ? -1 : a < b ? 1 : 0;
              })
              console.log("ALLQS", allQuestions.length)
              return allQuestions;
              // return paginate(first, after, last, before, questionType);

            })
        })
    })
// NEED TO DEFINE HAS NEXT AND HAS PREV IN THIS PART. Via search in db!!
}