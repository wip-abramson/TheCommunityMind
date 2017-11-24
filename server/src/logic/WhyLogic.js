/**
 * Created by will on 07/11/17.
 */
import { authLogic } from './AuthLogic';
import { Conn, Why, Tag } from '../db';
import { paginationLogic } from './PaginationLogic';

export const whyLogic = {
  createWhy(_, { question, tagIds }, ctx) {
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
                return Tag.findAll({
                  where: { id: tagIds }
                })
                  .then(tags => {
                    console.log("FOUND TAGS", tags.length);
                    return whyQuestion.setTags(tags)
                      .then(() => {
                        console.log("WHY CREATED", newWhy.id);
                        return newWhy;
                      })

                  })

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
  query(_, { first, last, before, after }) {

    const args = paginationLogic.buildArgs(first, last, before, after);

    return this.buildPaginatedWhys(args, before);
  },

  buildPaginatedWhys(args, before) {

    var isCursor = args.where.createdAt ? true : false;

    return Why.findAll(args)
      .then(whys => {
          const edges = whys.map(why => {

            return  ({

              cursor: Buffer.from(why.createdAt.toString()).toString('base64'), // convert createdAt to cursor
              node: why
            })
          });

          return {
            edges,
            pageInfo: {
              hasNextPage () {
                if (whys.length < args.limit) {
                  return Promise.resolve(false);
                }

                return Why.findOne({
                  where: {
                    createdAt: {
                      [before ? '$gt' : '$lt']: whys[whys.length - 1].createdAt,
                    },
                  },
                  order: [['createdAt', 'DESC']],
                })
                  .then(why => !!why);
              },
              hasPreviousPage  () {
                const where = isCursor ? { createdAt: args.where.createdAt} : {}
                return Why.findOne({
                  where: {
                    createdAt: args.where.createdAt,
                  },
                  order: [['createdAt', 'DESC']],
                })
                  .then(why => !!why);
              }
            }
          }
        }
      )
      .catch(error => {
        console.log(error, "Error");
        return Promise.reject(error)
      })
  }

}
