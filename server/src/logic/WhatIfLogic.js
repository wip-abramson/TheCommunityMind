/**
 * Created by will on 07/11/17.
 */
import { authLogic } from './AuthLogic'
import { WhatIf } from '../db';
import { paginationLogic } from './PaginationLogic';

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
  query(_, { whyId, first, after, last, before }, ctx) {


    const args = paginationLogic.buildArgs(first, after, last, before);
    args.where ? args.where.whyId = whyId : args.where = { whyId: whyId };


    return this.buildPaginatedWhatIfs(args, before);

  },

  buildPaginatedWhatIfs(args, before) {
    return WhatIf.findAll(args)
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
              if (whatIfs.length < args.limit) {
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
                  createdAt: args.where.createdAt,
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
  }
};
