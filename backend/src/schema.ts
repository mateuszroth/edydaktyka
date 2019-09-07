import User from 'entities/User';
import authResolvers from 'modules/auth/resolvers';
import { getRepository } from 'typeorm';

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
          return getRepository(User).findOne(album).then(user => {
            user.password = "";
            user.passwordSalt = "";
            return user;
          });
      },
  },
  Mutation: {
      register: authResolvers.register,
      resetPassword: authResolvers.resetPassword,
      login: authResolvers.login,
  },
};

export default {
    typeDefs,
    resolvers
}