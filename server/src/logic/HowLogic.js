/**
 * Created by will on 07/11/17.
 */
import { authLogic } from './AuthLogic';
import { How } from '../db';

export const howLogic = {
  createHow(_, { question, whatIfId }, ctx) {
    return authLogic.getAuthenticatedUser(ctx)
      .then(user => {
        return How.create({ whatifId: whatIfId })
          .then((newHow) => {
            return newHow.createQuestion({
              question,
              stars: 0,
              howId: newHow.id,
              userId: user.id
            })
              .then((howQuestion) => {
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

