/**
 * Created by will on 07/11/17.
 */
import { authLogic } from './AuthLogic';
import { Conn, Why, Tag } from '../db';

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

    const where = {};
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

    return Why.findAll({
      where,
      order,
      limit: first || last,
    })
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
                if (whys.length < (last || first)) {
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
                return Why.findOne({
                  where: {
                    createdAt: where.createdAt,
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
  },

}
