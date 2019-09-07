import 'module-alias/register';
import { GraphQLServer } from 'graphql-yoga';
import { createConnection, getRepository } from 'typeorm';
import { AuthenticationError } from 'apollo-server';
import User from './entities/User';
import authResolvers from 'modules/auth/resolvers';

const typeDefs = `
  type User {
    album: ID!
    firstName: String!
    lastName: String!
    password: String!
    email: String!
    photo: String
  }
  type Query {
    hello(name: String): String!
    user(album: ID!): User!
  }
  type Mutation {
    register(album: ID!, firstName: String!, lastName: String!, email: String!, password: String!, photo: String ): User,
    resetPassword(album: ID!): String,
    login(album: ID!, password: String!): String!
  }
`;

const resolvers = {
    Query: {
        hello: (_, { name }) => `Hello ${name || 'World'}`,
        user: (_, { album }) => {
            return getRepository(User).findOne(album);
        },
    },
    Mutation: {
        register: authResolvers.register,
        resetPassword: authResolvers.resetPassword,
        login: authResolvers.login,
    },
};

const server = new GraphQLServer({ typeDefs, resolvers });

createConnection()
    .then(() => {
        server.start(() => console.log('Server is running on localhost:4000'));
    })
    .catch(err => {
        console.log(err);
        console.log("Couldn't connect to the database.");
    });
