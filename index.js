const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const port = 4000;

var schema = buildSchema(`
    type Query {
        ip: String
    }
`);

const loggingMiddleware = (req, res, next) => {
    console.log('ip:', req.ip);
    next();
}

var root = {
    ip: function (args, request) {
        return request.ip;
    }
};

const app = express();
app.use(loggingMiddleware);

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

app.listen(port, () => {
    console.log(`Running a GraphQL API server at http://localhost:${port}/graphql`);
});