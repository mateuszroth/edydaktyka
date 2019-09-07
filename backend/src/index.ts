import { GraphQLServer } from "graphql-yoga";
import { createConnection, getRepository } from "typeorm";
import { User } from "./entities/User";

const typeDefs = `
  type User {
    album: ID!
    firstName: String!
    lastName: String!
    email: String!
  }
  type Query {
    hello(name: String): String!
    user(album: ID!): User!
  }
  type Mutation {
    addUser(album: ID!, firstName: String!, lastName: String!, email: String!): User
  }
`;

const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name || "World"}`,
    user: (_, { id }) => {
      return getRepository(User).findOne(id);
    },
  },
  Mutation: {
    addUser: (_, { album, firstName, lastName, email }) => {
      const user = new User();
      user.album = album;
      user.firstName = firstName;
      user.lastName = lastName;
      user.email = email;
      return getRepository(User).save(user);
    }
  }
};

const server = new GraphQLServer({ typeDefs, resolvers });

createConnection()
  .then(() => {
    server.start(() => console.log("Server is running on localhost:4000"));
  })
  .catch(() => {
    console.log("Couldn't connect to the database.");
  });
