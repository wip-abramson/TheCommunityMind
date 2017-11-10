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
  query(_, { whyId }, ctx) {
    return WhatIf.findAll({
      where: {
        whyId
      },
      order: [['createdAt', 'DESC']],
    })
      .then(whatIfs => {
        return whatIfs;
      })
      .catch(error => {
        console.log(error, "Error");
        return Promise.reject(error)
      })
  },
  paginatedQuery(_, { whyId, cursor }, ctx) {
    return this.query(_, { whyId }, ctx).then(whatIfs => {
      // if no cursor set cursor as time of last created whatIfs
      if (!cursor) {
        console.log(whatIfs[0].createdAt)
        cursor = whatIfs[0].createdAt;
      }


      // cursor = parseInt(cursor);
      console.log(cursor, "cursor")
      // fix limit of number of whatIfs returned
      const limit = 2;

      // find index of message created at time held in cursor
      const newestWhatIfIndex = whatIfs.findIndex(
        whatIf => whatIf.createdAt === cursor
      );
      console.log(newestWhatIfIndex, "whatIfIndex")
      // We need to return a new cursor to the client so that it
      // can find the next page. Let's set newCursor to the
      // createdAt time of the last whatIf in this whatIfFeed:
      var newCursor;
      try {
        newCursor =
          whatIfs[newestWhatIfIndex + limit].createdAt;
      }
      catch(error) {
        newCursor = whatIfs[whatIfs.length - 1].createdAt;
      }

      const whatIfFeed = {
        whatIfs: whatIfs.slice(
          newestWhatIfIndex,
          newestWhatIfIndex + limit
        ),
        cursor: newCursor,
      }

      return whatIfFeed;

    })

  }
}
