/**
 * Created by will on 07/06/17.
 */
import { Topic, Why, WhatIf, How, User, Question } from "./db";

// reusable function to check for a user with context
function getAuthenticatedUser(ctx) {
  console.log("Getting user")
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
        return Why.create({ }).then((newWhy) => {
          return newWhy.createQuestion({ question, stars: 0, userId: user.id, whyId: newWhy.id }).then((whyQuestion) => {
            console.log(whyQuestion.question);
            newWhy.setQuestion(whyQuestion);
            return newWhy;
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

        return WhatIf.create({ whyId }).then((newWhatIf) => {
          return newWhatIf.createQuestion({ question, stars: 0, whatIfId: newWhatIf.id, userId: user.id }).then((whatIfQuestion) => {
            newWhatIf.setQuestion(whatIfQuestion);
            return newWhatIf;
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
        return How.create({ whatifId : whatIfId }).then((newHow) => {
          return newHow.createQuestion({ question, stars: 0, howId: newHow.id, userId: user.id }).then((howQuestion) => {
            newHow.setQuestion(howQuestion);
            return newHow;
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

export const questionLogic = {
  deleteQuestion(_, { id }, ctx) {
    return getAuthenticatedUser(ctx).then((user) => {
      return Question.findOne({
          where: {id },
          include: [{
            model: User,
            where: { id: user.id },
          }],

      }).then(question => question.getUser())
        .then(user => question.removeUser(user))
        .then(() => How.destroy({ where: { id: question.howId }}))
        .then(() => WhatIf.destroy({ where: { id: question.whatIfId }}))
        .then(() => Why.destroy({ where: { id: question.whyId }}))
        .then(() => question.destroy())

    });
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

