import express from "express";
import {graphiqlExpress} from "graphql-server-express";
import {schema} from "./src/schema";
import cors from "cors";
import graphqlHTTP from "express-graphql";


const PORT = 5000
const server = express();

server.use('*', cors({origin: 'http://0.0.0.0:8080'}))

server.use(express.static('../public'))

// server.use('/graphql', jwt({
//   secret: 'shhhhhhared-secret',
//   requestProperty: 'auth',
//   credentialsRequired: false,
// }));
server.use('/graphql', function (req, res, done) {
  // const user = User.get(req.auth.sub);
  req.context = {
    // user: user,
  }
  done();
});
server.use('/graphql', graphqlHTTP(req => ({
    schema: schema,
    context: req.context,
  })
));

server.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}));


server.listen(PORT, () => console.log(`GraphQL Server is now running on http://localhost:${PORT}`));