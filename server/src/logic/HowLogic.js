/**
 * Created by will on 07/11/17.
 */
import { authLogic } from './AuthLogic';
import { How } from '../db';
import { paginationLogic } from './PaginationLogic';

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

    const args = paginationLogic.buildArgs(first, after, last, before);
    args.where ? args.where.whatifId = whatIfId : args.where = { whatifId: whatIfId}

    return this.buildPaginatedHows(args, before);

  },

  buildPaginatedHows(args, before) {

    return How.findAll(args)
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
              if (hows.length < args.limit) {
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
                  createdAt: args.where.createdAt,
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
  }


}

