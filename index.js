const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const port = 4000;

var schema = buildSchema(`
    input MessageInput {
        content: String
        author: String
    }
    
    type Message {
        id: ID!
        content: String
        author: String
    }
    
    type Query {
        getMessage(id: ID!): Message
    }
    
    type Mutation {
        createMessage(input: MessageInput): Message
        updateMessage(id: ID!, input: MessageInput): Message
    }
`);


// If Message had any complex fields, we'd put them on this object.
class Message {
    constructor(id, { content, author }) {
        this.id = id;
        this.content = content;
        this.author = author;
    }
}

// Maps username to content
var fakeDatabase = {};

var root = {
    getMessage: ({ id }) => {
        if (!fakeDatabase[id]) {
            throw new Error('no message exists with id ' + id);
        }
        return new Message(id, fakeDatabase[id]);
    },
    createMessage: ({ input }) => {
        // Create a random id for our "database".
        var id = new Date().getTime();
        console.log(input)
        fakeDatabase[id] = input;
        return new Message(id, input);
    },
    updateMessage: ({ id, input }) => {
        if (!fakeDatabase[id]) {
            throw new Error('no message exists with id ' + id);
        }
        // This replaces all old data, but some apps might want partial update.
        fakeDatabase[id] = input;
        return new Message(id, input);
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