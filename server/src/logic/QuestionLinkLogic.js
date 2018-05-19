/**
 * Created by will on 18/05/18.
 */
import {QuestionLink, QuestionLinkType, User, Op} from '../db';
import {paginationLogic} from './PaginationLogic';
import {authLogic} from './AuthLogic';

const linkTypes = [{type: "parentChild", id: 1}, {type: "related", id: 2}, {type: "rewording", id: 3}];


export const questionLinkLogic = {
  query(_, args, ctx) {
    return QuestionLink.findAll();
  },
  linkType(questionLink, args, ctx) {
    return QuestionLinkType.findOne({
      where: {id: questionLink.questionLinkTypeId},
    }).then(questionLinkType => {
      return questionLinkType.linkType
    })
  },
  approval(questionLink, args, ctx) {
    return User.count({
      include: [{model: QuestionLink, as: "QuestionLinkApproval", where: {id: questionLink.id}}]
    })
  },
  approvedByCurrentUser(questionLink, args, ctx) {
    return authLogic.getAuthenticatedUser(ctx)
      .then(currentUser => {
        return User.findOne({
          where: { id: currentUser.id },
          include: [{ model: QuestionLink, as: "QuestionLinkApproval", where: { id: questionLink.id } }]
        })
          .then(user => {
            return !!user;
          })
      })
      .catch(error => {
        console.log(error);
        return false;
      })
  },
  // TODO how can I better represent linkTypeId
  subQuestionLinks(question, {first, after, last, before}, ctx) {
    const args = paginationLogic.buildArgs(first, after, last, before);

    args.where = Object.assign({}, args.where, {
      fromId: question.id,
      // TODO should not have to know this is 1
      questionLinkTypeId: 1
    });
    return this.buildPaginatedQuestionLinks(args, before);
  },
  subQuestionLinksCount(question, args, ctx) {
    return QuestionLink.count({
      where: {
        fromId: question.id,
        questionLinkTypeId: 1
      }
    })
  },
  superQuestionLinks(question, {first, after, last, before}, ctx) {
    const args = paginationLogic.buildArgs(first, after, last, before);
    args.where = Object.assign({}, args.where, {
      toId: question.id,
      // TODO should not have to know this is 1
      questionLinkTypeId: 1
    });

    return this.buildPaginatedQuestionLinks(args, before);
  },
  superQuestionLinksCount(question, args, ctx) {
    return QuestionLink.count({
      where: {
        toId: question.id,
        questionLinkTypeId: 1
      }
    })
  },
  relatedQuestionLinks(question, {first, after, last, before}, ctx) {
    const args = paginationLogic.buildArgs(first, after, last, before);

    // TODO should not have to know this is 2
    args.where = Object.assign({}, args.where, {
      [Op.or]: [
        {
          toId: question.id
        },
        {
          fromId: question.id
        }
      ],
      questionLinkTypeId: 2
    });

    return this.buildPaginatedQuestionLinks(args, before);
  },
  relatedQuestionLinksCount(question, args, ctx) {
    return QuestionLink.count({
      where: {
        [Op.or]: [
          {
            toId: question.id
          },
          {
            fromId: question.id
          }
        ],
        questionLinkTypeId: 2
      }
    })
  },
  buildPaginatedQuestionLinks(args, before) {
    return QuestionLink.findAll(args)
      .then(questionLinks => {
        const edges = questionLinks.map(questionLink => {
          return ({
            cursor: Buffer.from(questionLink.id.toString()).toString('base64'), // convert id to cursor
            node: questionLink
          })
        });
        // if no whatifs then no next or prev page
        if (questionLinks.length === 0) {
          return {
            edges,
            pageInfo: {
              hasNextPage() {
                return false;
              },
              hasPreviousPage() {
                return false;
              }
            }
          }
        }

        args.where.id = {
          [before ? '$gt' : '$lt']: questionLinks[questionLinks.length - 1].id,
        };

        return {
          edges,
          pageInfo: {
            hasNextPage () {
              if (questionLinks.length < args.limit) {
                return Promise.resolve(false);
              }
              return QuestionLink.findOne(args)
                .then(questionLink => !!questionLink);
            },
            hasPreviousPage  () {
              return QuestionLink.findOne(args)
                .then(questionLink => !!questionLink);
            }
          }
        }
      })
      .catch(error => {
        console.log(error, "Error");
        return Promise.reject(error)
      })
  },

};