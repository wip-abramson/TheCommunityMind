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
                    console.log("FOUND TAGS", tags.length)
                    return whyQuestion.setTags(tags)
                      .then(() => {
                        console.log("WHY CREATED", newWhy.id)
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
    console.log(first, after)

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
          console.log(whys.length)
          const edges = whys.map(why => {
            console.log(Date.parse(why.createdAt));
            console.log(why.createdAt, Buffer.from(why.createdAt.toString("fff")).toString("base64"))
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
  paginatedQuery(_, { cursor }, ctx)
  {
    // find all whys
    return this.query().then(whys => {
      // if no cursor set cursor as time of last created why
      if (!cursor) {
        console.log(whys[0].createdAt)
        cursor = whys[0].createdAt;
      }

      // cursor = parseInt(cursor);
      console.log(cursor, "cursor")
      // fix limit of number of whys returned
      const limit = 2;

      // find index of message created at time held in cursor
      const newestWhyIndex = whys.findIndex(
        why => why.createdAt === cursor
      );
      console.log(newestWhyIndex, "whyIndex")
      // We need to return a new cursor to the client so that it
      // can find the next page. Let's set newCursor to the
      // createdAt time of the last why in this whyFeed:
      var newCursor;
      try {
        newCursor =
          whys[newestWhyIndex + limit].createdAt;
      }
      catch (error) {
        newCursor = whys[whys.length - 1].createdAt;
      }

      const whyFeed = {
        whys: whys.slice(
          newestWhyIndex,
          newestWhyIndex + limit
        ),
        cursor: newCursor,
      }

      return whyFeed;

    })

  }
}
