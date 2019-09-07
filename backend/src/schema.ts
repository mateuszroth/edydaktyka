import authResolvers from 'modules/auth/resolvers';

const typeDefs = `
type User {
  album: Int
  firstName: String
  lastName: String
  email: String
  photo: String
  isActive: Boolean
  isAdmin: Boolean
}
type Query {
  hello(name: String): String!
  currentUser(album: Int!): User!
}
type Mutation {
  register(album: Int!, firstName: String!, lastName: String!, email: String!, password: String!, photo: String): String!,
  resetPassword(album: Int!): String!,
  login(album: Int!, password: String!): String!
}
`;

const resolvers = {
    Query: {
        hello: (_, { name }) => `Hello ${name || 'World'}`,
        currentUser: authResolvers.currentUser,
    },
    Mutation: {
        register: authResolvers.register,
        resetPassword: authResolvers.resetPassword,
        login: authResolvers.login,
    },
};

export default {
    typeDefs,
    resolvers,
};
