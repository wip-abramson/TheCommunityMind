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
  query(_, { whatIfId }, ctx) {
    return How.findAll({
      where: {
        whatIfId
      },
      order: [['createdAt', 'DESC']],
    })
      .then(hows => {
        console.log(hows.length)
        return hows;
      })
      .catch(error => {
        console.log(error, "Error");
        return Promise.reject(error)
      });
  },
  paginatedQuery(_, { whatIfId, cursor }, ctx) {
    return this.query(_, { whatIfId }, ctx).then(hows => {
      // if no cursor set cursor as time of last created hoq
      if (!cursor) {
        console.log(hows.length)
        console.log(hows[0].createdAt)
        cursor = hows[0].createdAt;
      }

      console.log(cursor, "cursor")
      // fix limit of number of whys returned
      const limit = 2;

      // find index of message created at time held in cursor
      const newestHowIndex = hows.findIndex(
        how => how.createdAt === cursor
      );
      console.log(newestHowIndex, "howIndex")

      var howFeed = {};
      // We need to return a new cursor to the client so that it
      // can find the next page. Let's set newCursor to the
      // createdAt time of the last how in this howFeed:
      var newCursor;
      try {
        newCursor =
          hows[newestHowIndex + limit].createdAt;
      }
      catch(error) {
        // will throw error if newestHowIndex+limit bigger than size of list
        // so set cursor as time last of last how in the list
        newCursor =
          hows[hows.length - 1].createdAt;
      }

      howFeed = {
        hows: hows.slice(
          newestHowIndex,
          newestHowIndex + limit
        ),
        cursor: newCursor,
      }

      return howFeed;
    })
  }
}

