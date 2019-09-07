import 'module-alias/register';
import { GraphQLServer } from 'graphql-yoga';
import { createConnection } from 'typeorm';
import schema from './schema';

const server = new GraphQLServer(schema);

createConnection()
    .then(() => {
        server.start(() => console.log('Server is running on localhost:4000'));
    })
    .catch(err => {
        console.log(err);
        console.log("Couldn't connect to the database.");
    });
