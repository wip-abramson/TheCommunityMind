/**
 * Created by will on 07/11/17.
 */
import { authLogic } from './AuthLogic'
import { WhatIf } from '../db';

export const whatIfLogic = {
  createWhatIf(_, { question, whyId }, ctx) {
    return authLogic.getAuthenticatedUser(ctx)
      .then(user => {

        return WhatIf.create({ whyId })
          .then((newWhatIf) => {
            return newWhatIf.createQuestion({
              question,
              stars: 0,
              whatIfId: newWhatIf.id,
              userId: user.id
            })
              .then((whatIfQuestion) => {
                newWhatIf.setQuestion(whatIfQuestion);
                return newWhatIf;
              });
          });
      });
  },
  hows(whatIf) {
    return whatIf.getHows()
      .then(hows => {
        return hows;
      })
      .catch(error => {
        console.log(error, "Error");
        return Promise.reject(error)
      })
  },
  question(whatIf) {
    return whatIf.getQuestion()
      .then(question => {
        return question
      })
      .catch(error => {
        console.log(error, "Error");
        return Promise.reject(error)
      })
  },
  query(_, { whyId }, ctx) {
    return WhatIf.findAll({
      where: {
        whyId
      },
      order: [['createdAt', 'DESC']],
    })
      .then(whatIfs => {
        return whatIfs;
      })
      .catch(error => {
        console.log(error, "Error");
        return Promise.reject(error)
      })
  }
}
