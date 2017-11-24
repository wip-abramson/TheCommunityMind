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
      })
      .catch(error => {
        console.log(error, "Error");
        return Promise.reject(error)
      });
  },
  question(how) {
    return how.getQuestion();
  },
  query(_, { whatIfId, first, after, last, before }, ctx) {

    const where = { whatIfId: whatIfId };
    var order;

    // because we return messages from newest -> oldest
    // before actually means newer (id > cursor)
    // after actually means older (id < cursor)

    if (before) {
      // convert base-64 to utf8 createdAt
      where.createdAt = { $gt: Buffer.from(before, 'base64').toString() };
      order =  [['createdAt', 'ASC']]

    }
    if (after) {
      where.createdAt = { $lt: Buffer.from(after, 'base64').toString() };
      order = [['createdAt', 'DESC']]
    }

    return How.findAll({
      where,
      order,
      limit: first || last
    })
      .then(hows => {
        console.log(hows.length)

        const edges =  hows.map(how => {
          return ({
            node : how,
            cursor: Buffer.from(how.createdAt.toString()).toString('base64'), // convert createdAt to cursor
          })
        })

        return {
          edges,
          pageInfo: {
            hasNextPage() {
              if (hows.length < (last || first)) {
                return Promise.resolve(false);
              }

              return How.findOne({
                where: {
                  createdAt: {
                    [before ? '$gt' : '$lt']: hows[hows.length - 1].createdAt,
                  },
                },
                order: [['createdAt', 'DESC']],
              })
                .then(how => !!how);
            },
            hasPreviousPage  () {
              return How.findOne({
                where: {
                  createdAt: where.createdAt,
                },
                order: [['createdAt', 'DESC']],
              })
                .then(how => !!how);
            }

          }
        }

      })
      .catch(error => {
        console.log(error, "Error");
        return Promise.reject(error)
      });
  },

}

