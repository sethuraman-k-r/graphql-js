const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const port = 4000;

var schema = buildSchema(`
    type RandomDie {
        rollOnce: Int!
        numSides: Int!
        roll(numRolls: Int!): [Int]
    }
    
    type Query {
        getDie(numSides: Int): RandomDie
    }
`);

class RandomDie {
    constructor(numSides) {
        this.numSides = numSides;
    }

    rollOnce() {
        return 1 + Math.floor(Math.random() * this.numSides);
    }

    roll({ numRolls }) {
        var output = [];
        for (var i = 0; i < numRolls; i++) {
            output.push(this.rollOnce());
        }
        return output;
    }
}

var root = {
    getDie: ({ numSides }) => {
        return new RandomDie(numSides || 6);
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