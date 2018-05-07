import express from "express";
import {graphiqlExpress, graphqlExpress} from "graphql-server-express";
import {schema} from "./src/schema";
import cors from "cors";
import jwt from 'express-jwt';
import bodyParser from 'body-parser';
import { JWT_SECRET } from './config';
import { User } from './src/db';

const PORT = 5000;
const server = express();

function loggingMiddleware(req, res, next) {
  next();
}

server.use('*', cors());

server.use(express.static('../public'));
server.use(loggingMiddleware);
server.use('/graphql', bodyParser.json(), jwt({
  secret: JWT_SECRET,
  credentialsRequired: false,
}), graphqlExpress((request) => {
  console.log(request.user)
  return ({
    schema: schema,
    context: {
      user: request.user ?
        User.findOne({
          where:  { id: request.user.id, version: request.user.version }
        }) : Promise.resolve(null),
    },
})}));


server.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}));


server.listen(process.env.PORT || PORT, () => console.log(`GraphQL Server is now running on http://0.0.0.0:${PORT}`));