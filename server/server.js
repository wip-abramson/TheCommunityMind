import express from "express";
import {graphiqlExpress} from "graphql-server-express";
import {schema} from "./src/schema";
import cors from "cors";
import graphqlHTTP from "express-graphql";
import session from 'express-session';

const PORT = 5000
const server = express();

function loggingMiddleware(req, res, next) {
  // console.log('header:', req.header);
  next();
}

server.use('*', cors({origin: 'http://0.0.0.0:8080', credentials: true}))

server.use(express.static('../public'))
server.use(loggingMiddleware)
server.use('/graphql', session({
  secret: 'shhhhhhared-secret',
  cookie: { maxAge: 60000 },
  resave: true,
  saveUninitialized: true
}), );
// httpGraphQLHandler
// const httpGraphQLHandler = async (req, res) => {
//   const {query, variables, ...rootVals} = req.body;
//   const authToken = req.user || {};
//   const result = await graphql(schema, query, {authToken, ...rootVals}, variables);
//   res.send(result);
// }
// server.use('/graphql', function (req, res, done) {
//   var authToken = req.options.headers.authorization
//   const user = User.get(authToken);
//   req.context = {
//     user: user,
//   }
//   done();
// });

server.use('/graphql', graphqlHTTP((request) => ({
  schema: schema,
  rootValue: { session: request.session },
})));

server.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}));


server.listen(PORT, () => console.log(`GraphQL Server is now running on http://0.0.0.0:${PORT}`));