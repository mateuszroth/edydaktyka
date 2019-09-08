import authResolvers from 'modules/auth/resolvers';
import groupsResolvers from 'modules/groups/resolvers';

const typeDefs = `
type Group {
  id: ID!
  modeOfStudy: String!
  fieldOfStudy: String!
  groupNumber: String!
  groupHalf: String!
  courseName: String!
  link: String
  description: String
  isActive: Boolean!
}
type User {
  album: Int!
  firstName: String!
  lastName: String!
  email: String!
  photo: String
  isActive: Boolean!
  isAdmin: Boolean!
  groups: [Group]
}
type Query {
  hello(name: String): String!
  currentUser(album: Int!): User!
  groups(isActive: Boolean): [Group]!
}
type Mutation {
  register(album: Int!, firstName: String!, lastName: String!, email: String!, password: String!, photo: String): String!,
  resetPassword(album: Int!): String!,
  login(album: Int!, password: String!): String!
  assignUserToGroup(id: ID!): String!
}
`;

const resolvers = {
    Query: {
        hello: (_, { name }) => `Hello ${name || 'World'}`,
        currentUser: authResolvers.currentUser,
        groups: groupsResolvers.groups,
    },
    Mutation: {
        register: authResolvers.register,
        resetPassword: authResolvers.resetPassword,
        login: authResolvers.login,
        assignUserToGroup: groupsResolvers.assignUserToGroup,
    },
};

export default {
    typeDefs,
    resolvers,
};
