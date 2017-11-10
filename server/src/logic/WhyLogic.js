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
  },
  paginatedQuery(_, { cursor }, ctx) {
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
       catch(error) {
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
