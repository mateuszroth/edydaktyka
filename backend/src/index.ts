import 'module-alias/register';
import * as dotenv from 'dotenv';
import { GraphQLServer } from 'graphql-yoga';
import { createConnection } from 'typeorm';
import schema from './schema';
import authenticate from 'modules/auth/middleware';

dotenv.config();

const server = new GraphQLServer({
    ...schema,
    context: (req: Request): Request => ({ ...req }),
    middlewares: [authenticate],
});

async function startServer() {
    try {
        const dbConnection = await createConnection();
        server.start(() => console.log('Server is running on localhost:4000'));
    } catch (err) {
        console.log(err);
        console.log("Couldn't connect to the database.");
    }
}

startServer();
