import 'module-alias/register';
import * as express from 'express';
import * as dotenv from 'dotenv';
import { GraphQLServer } from 'graphql-yoga';
import { createConnection } from 'typeorm';
import schema from './schema';
import authenticate from 'modules/auth/middleware';
import { ensureUploadDirExists } from 'modules/upload';

dotenv.config();
ensureUploadDirExists();

const server = new GraphQLServer({
    ...schema,
    context: (req: Request): Request => ({ ...req }),
    middlewares: [authenticate],
});

server.express.use('/static', express.static('static'));

const opts = {
    port: 4000,
    cors: {
        credentials: true,
        origin: ['http://localhost:3000', 'https://localhost:3000'], // TODO: get from env
    },
};

async function startServer() {
    try {
        const dbConnection = await createConnection();
        server.start(opts, () => console.log('Server is running on localhost:4000'));
    } catch (err) {
        console.log(err);
        console.log("Couldn't connect to the database.");
    }
}

startServer();
