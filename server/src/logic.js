/**
 * Created by will on 07/06/17.
 */
import { Topic, Why, WhatIf, How, User, Question } from "./db";

// reusable function to check for a user with context
function getAuthenticatedUser(ctx) {
  if (!ctx.user) {
    return Promise.reject('Unauthorized');
  }

  return ctx.user.then((user) => {
    if (!user) {
      return Promise.reject('Unauthorized');
    }

    return user;
  })
}

export const whyLogic = {
  createWhy(_, { question }, ctx) {
    return getAuthenticatedUser(ctx)
      .then(user => {
        return user.createQuestion({ question, stars: 0 }).then((whyQuestion) => {
          return Why.create({}).then((newWhy) => {
            newWhy.setQuestion(whyQuestion);
          });
        });
      });
  },
  whatIfs(why) {
    return why.getWhatIfs();
  },
  question(why) {
    // console.log(why.getQuestion())
    return why.getQuestion();
  },
  query() {
    return Why.findAll({
      order: [['createdAt', 'DESC']],
    });
  }
}

export const whatIfLogic = {
  createWhatIf(_, { question, whyId }, ctx) {
    return getAuthenticatedUser(ctx)
      .then(user => {
        return user.createQuestion({ question, stars: 0 }).then((whatIfQuestion) => {
          return WhatIf.create({ whyId }).then((newWhatIf) => {
            newWhatIf.setQuestion(whatIfQuestion);
          });
        });
      });
  },
  hows(whatIf) {
    return whatIf.getHows();
  },
  question(whatIf) {
    return whatIf.getQuestion();
  },
  query(_, { whyId }, ctx) {
    return WhatIf.findAll({
      where: {
        whyId
      },
      order: [['createdAt', 'DESC']],
    });
  }
}

export const howLogic = {
  createHow(_, { question, whatIfId }, ctx) {
    return getAuthenticatedUser(ctx)
      .then(user => {
        return user.createQuestion({ question, stars: 0}).then((howQuestion) => {
          return How.create({ whatIfId }).then((newHow) => {
            newHow.setQuestion(howQuestion);
          });
        });
      });
  },
  question(how) {
    return how.getQuestion();
  },
  query(_, { whatIfId }, ctx) {
    return How.findAll({
      where: {
        whatIfId
      },
      order: [['createdAt', 'DESC']],
    })
  }
}

export const userLogic = {
  jwt(user) {
    return Promise.resolve(user.jwt);
  },
  questions(user, args, ctx) {
    return getAuthenticatedUser(ctx).then((currentUser) => {
      if (currentUser.id !== user.id) {
        return Promise.reject('Unauthorized');
      }
      return Question.findAll({
        where: { userId: user.id },
        order: [['createdAt', 'DESC']],
      });
    });
  },
}

