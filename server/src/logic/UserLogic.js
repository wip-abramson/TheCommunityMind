/**
 * Created by will on 07/11/17.
 */
import { Question, User, Tag, Why, WhatIf, How } from '../db';
import { authLogic } from './AuthLogic';

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

    const args = setPaginationQueryArgs(first, after, last, before);

    args.include = [{ model: Question, where: { userId: user.id }, order: [['createdAt', 'DESC']] }]

    return findAllQuestions(args)
      .then(allQuestions => paginate(first, after, last, before, allQuestions))

      .catch(error => {
        console.log(error, "Error");
        return Promise.reject(error)
      });
  },
  whys(user, args, ctx) {
    return Why.findAll({
      include: [{ model: Question, where: { userId: user.id } }]
    })
  },
  whatIfs(user, args, ctx) {
    return WhatIf.findAll({
      include: [{ model: Question, where: { userId: user.id } }]
    })
  },
  hows(user, args, ctx) {
    return How.findAll({
      include: [{ model: Question, where: { userId: user.id } }]
    })
  },
  staredQuestions(user, { first, after, last, before }, ctx) {

    const args = setPaginationQueryArgs(first, after, last, before);

    args.include =[{model:Question, include: [{ model: User, as: "StaredBy", where: { id: user.id }}] }];


    return findAllQuestions(args)
      .then(allQuestions => paginate(first, after, last, before, allQuestions))

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

  }

}

function paginate(first, after, last, before, items) {

  var hasNextPage = false;
  var hasPreviousPage = false;
  var limitedItems = [];
  if (before) {
    // convert base-64 to utf8 createdAt
    var createdAt = Buffer.from(before, 'base64').toString()

    const itemIndex = items.findIndex(
      item => item.createdAt.toString() === createdAt
    );
    console.log(itemIndex);

    if (itemIndex - last > 0) {
      hasPreviousPage = true;
    }

    if (itemIndex !== items.length - 1) {
      hasNextPage = true;
    }

    var limitedItems = items.slice(hasPreviousPage ? itemIndex - last : 0, itemIndex);

  }
  else if (after) {
    var createdAt = Buffer.from(after, 'base64').toString();

    const itemIndex = items.findIndex(
      item => item.createdAt.toString() === createdAt
    );
    console.log(itemIndex);

    if (itemIndex !== 0) {
      hasPreviousPage = true;
    }

    if (itemIndex + first < items.length) {
      hasNextPage = true;
    }

    var limitedItems = items.slice(itemIndex, itemIndex + first);

  }
  else {
    var number = first ? first : last;

    var limitedItems = items.slice(0, number);

    if (number < items.length) {
      hasNextPage = true;
    }

  }

  var edges = limitedItems.map(node => ({
    cursor: Buffer.from(node.createdAt.toString()).toString('base64'), // convert createdAt to cursor
    node
  }))

  return {
    edges,
    pageInfo: {
      hasPreviousPage: () => hasPreviousPage,
      hasNextPage: () => hasNextPage
    }
  }
}

function setPaginationQueryArgs(first, after, last, before) {
  const args = {}

  args.limit = first || last;

  // because we return messages from newest -> oldest
  // before actually means newer (id > cursor)
  // after actually means older (id < cursor)

  if (before) {
    // convert base-64 to utf8 createdAt
    args.where.createdAt = { $gt: Buffer.from(before, 'base64').toString() };
    args.order = [['createdAt', 'ASC']]

  }
  if (after) {
    args.where.createdAt = { $lt: Buffer.from(after, 'base64').toString() };
    args.order = [['createdAt', 'DESC']]
  }

  return args;
}

function findAllQuestions(args) {
  return Why.findAll(args)
    .then(whys => {
      return WhatIf.findAll(args)
        .then(whatIfs => {
          return How.findAll(args)
            .then(hows => {
              var allQuestions = whys.concat(whatIfs, hows);

              console.log(allQuestions.length);
              allQuestions.sort((a, b) => {
                a = new Date(a.createdAt);
                b = new Date(b.createdAt);
                return a > b ? -1 : a < b ? 1 : 0;
              })

              return allQuestions;
              // return paginate(first, after, last, before, questionType);

            })
        })
    })

}