/**
 * Created by will on 24/11/17.
 */

export const paginationLogic = {

  buildArgs(first, after, last, before) {
    const args = {};

    args.limit = first || last;

    args.where = {}

    // because we return messages from newest -> oldest
    // before actually means newer (id > cursor)
    // after actually means older (id < cursor)
    args.order = [['createdAt', 'DESC']];


    if (before) {
      // convert base-64 to utf8 createdAt
      args.where.createdAt = { $gt: Buffer.from(before, 'base64').toString() };
      args.order =  [['createdAt', 'ASC']]

    }
    if (after) {
      args.where.createdAt = { $lt: Buffer.from(after, 'base64').toString() };
    }



    // console.log(args.where.createdAt)

    return args;
  }
}