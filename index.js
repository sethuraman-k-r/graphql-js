const express = require('express');
const graphqlHTTP = require('express-graphql');

const schema = require('./graphql/schema');
const resolver = require('./graphql/resolver');

const port = 4000;
const app = express();

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: resolver,
    graphiql: true
}));

app.listen(port, () => {
    console.log(`Running a GraphQL API server at http://localhost:${port}/graphql`);
});