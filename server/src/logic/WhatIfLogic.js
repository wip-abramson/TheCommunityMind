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
  query(_, { whyId, first, last, before, after }, ctx) {

    const where = { whyId: whyId };
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

    console.log(where.createdAt)

    return WhatIf.findAll({
      where,
      order,
      limit: first || last
    })
      .then(whatIfs => {
        const edges = whatIfs.map(whatIf => {

          return  ({

            cursor: Buffer.from(whatIf.createdAt.toString()).toString('base64'), // convert createdAt to cursor
            node: whatIf
          })
        });

        return {
          edges,
          pageInfo: {
            hasNextPage () {
              if (whatIfs.length < (last || first)) {
                return Promise.resolve(false);
              }

              return WhatIf.findOne({
                where: {
                  createdAt: {
                    [before ? '$gt' : '$lt']: whatIfs[whatIfs.length - 1].createdAt,
                  },
                },
                order: [['createdAt', 'DESC']],
              })
                .then(whatIf => !!whatIf);
            },
            hasPreviousPage  () {
              return WhatIf.findOne({
                where: {
                  createdAt: where.createdAt,
                },
                order: [['createdAt', 'DESC']],
              })
                .then(whatIf => !!whatIf);
            }
          }
        }
      })
      .catch(error => {
        console.log(error, "Error");
        return Promise.reject(error)
      })
  },
}
