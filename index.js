const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const port = 4000;

var schema = buildSchema(`
    type Query {
        quoteOfTheDay: String
        random: Float!
        rollThreeDice: [Int]
    }
`);

var root = {
    quoteOfTheDay: () => {
      return Math.random() < 0.5 ? 'Take it easy' : 'Salvation lies within';
    },
    random: () => {
      return Math.random();
    },
    rollThreeDice: () => {
      return [1, 2, 3].map(_ => 1 + Math.floor(Math.random() * 6));
    },
  };

const app = express();

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

app.listen(port, () => {
    console.log(`Running a GraphQL API server at http://localhost:${port}/graphql`);
});