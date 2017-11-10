/**
 * Created by will on 07/11/17.
 */
import { authLogic } from './AuthLogic';
import { Why } from '../db';

export const whyLogic = {
  createWhy(_, { question }, ctx) {
    return authLogic.getAuthenticatedUser(ctx)
      .then(user => {
        return Why.create({})
          .then((newWhy) => {
            return newWhy.createQuestion({
              question,
              stars: 0,
              userId: user.id,
              whyId: newWhy.id
            })
              .then((whyQuestion) => {
                newWhy.setQuestion(whyQuestion);
                return newWhy;
              });
          });
      })
      .catch(error => {
        console.log(error, "Error");
        return Promise.reject(error)
      })
  },
  whatIfs(why) {
    return why.getWhatIfs()
      .then(whatIfs => {
        return whatIfs
      })
      .catch(error => {
        console.log(error, "Error");
        return Promise.reject(error)
      })
  },
  question(why) {
    // console.log(why.getQuestion())
    return why.getQuestion()
      .then(question => {
        return question;
      })
      .catch(error => {
        console.log(error, "Error");
        return Promise.reject(error)
      })
  },
  query() {
    return Why.findAll({
      order: [['createdAt', 'DESC']],
    })
      .then(whys => {
        return whys;
      })
      .catch(error => {
        console.log(error, "Error");
        return Promise.reject(error)
      })
  }
}
