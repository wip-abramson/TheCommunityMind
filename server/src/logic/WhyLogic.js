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
