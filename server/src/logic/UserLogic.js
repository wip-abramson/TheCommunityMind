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
  questions(user, args, ctx) {

    return Why.findAll({
      include: [{ model: Question, where: { userId: user.id }, order: [['createdAt', 'DESC']] }]

    })
      .then(whys => {
        console.log(whys.length);
        return WhatIf.findAll({
          include: [{ model: Question, where: { userId: user.id }, order: [['createdAt', 'DESC']] }]

        })
          .then(whatIfs => {
            console.log(whatIfs.length);

            return How.findAll({
              include: [{
                model: Question,
                where: { userId: user.id },
                order: [['createdAt', 'DESC']]
              }]

            }).then(hows => {
              // console.log(hows[1]);

              var questionType =  whys.concat(whatIfs, hows);
              console.log(questionType.length);
              questionType.sort((a, b) => {
                a = new Date(a.createdAt);
                b = new Date(b.createdAt);
                return a>b ? -1 : a<b ? 1 : 0;
              })
              return questionType;
            })
          })
      })
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
  staredQuestions(user, args, ctx) {
    // No Auth needed because everyone should be able to see a users stared questions
    return Question.findAll({
      include: [{ model: User, as: "StaredBy", where: { id: user.id } }]
    })
      .then(staredQuestions => {
        return staredQuestions;
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