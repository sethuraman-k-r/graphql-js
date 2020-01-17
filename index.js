const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const port = 4000;

var schema = buildSchema(`
    type Mutation {
        setMessage(message: String): String
    }
    
    type Query {
        getMessage: String
    }
`);

var fakeDatabase = {};
var root = {
    setMessage: ({ message }) => {
        fakeDatabase.message = message;
        return message;
    },
    getMessage: () => {
        return fakeDatabase.message;
    }
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