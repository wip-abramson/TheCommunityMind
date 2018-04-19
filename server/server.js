import express from "express";
import {graphiqlExpress, graphqlExpress} from "graphql-server-express";
import {schema} from "./src/schema";
import cors from "cors";
import jwt from 'express-jwt';
import bodyParser from 'body-parser';
import { JWT_SECRET } from './config';
import { User } from './src/db';

const PORT = 5000
const server = express();

function loggingMiddleware(req, res, next) {
  // console.log('header:', req.header);
  next();
}
var corsOptions = {
  origin: 'https://www.thecommunitymind.com',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

server.use('*', cors());

server.use(express.static('../public'));
server.use(loggingMiddleware);
server.use('/graphql', bodyParser.json(), cors(corsOptions), jwt({
  secret: JWT_SECRET,
  credentialsRequired: false,
}), graphqlExpress((request) => {
  // console.log("HERE", request)
  console.log(schema);
  return ({
  schema: schema,
  context: {
    user: request.user ?
      User.findOne({
        where:  { id: request.user.id, version: request.user.version }
      }) : Promise.resolve(null),
  },
})}));

// server.use('/graphql', bodyParser.json, graphqlExpress({ schema }));



server.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}));


server.listen(process.env.PORT || PORT, () => console.log(`GraphQL Server is now running on http://0.0.0.0:${PORT}`));