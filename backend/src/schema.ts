import authResolvers from 'modules/auth/resolvers';
import groupsResolvers from 'modules/groups/resolvers';
import classResolvers from 'modules/classes/resolvers';

const typeDefs = `
scalar Date
input InputClass {
  groupId: ID!
  classNumber: Int!
  takenOn: Date
  title: String!
}
input InputGroup {
  modeOfStudy: String!
  fieldOfStudy: String!
  groupNumber: String!
  groupHalf: String!
  courseName: String!
  link: String
  description: String
}
type ClassAttendance {
  id: ID!
  classId: Int!
  groupId: Int!
  userId: Int!
  isPresent: Boolean!
  isReportRequired: Boolean!
  reportFile: String
  reportGrade: Int
  reportAddedOn: Date
}
type Class {
  id: ID!
  groupId: Int!
  classNumber: Int!
  takenOn: Date
  title: String!
}
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
  users: [User]!
  classes: [Class]!
}
type User {
  album: Int!
  firstName: String!
  lastName: String!
  email: String!
  photo: String
  isActive: Boolean!
  isAdmin: Boolean!
  groups: [Group]!
}
type Query {
  hello(name: String): String!
  currentUser(album: Int): User!
  groups(isActive: Boolean): [Group]!
  groupAttendances(id: ID!): [ClassAttendance]!
  classAttendances(id: ID!): [ClassAttendance]!
}
type Mutation {
  register(album: Int!, firstName: String!, lastName: String!, email: String!, password: String!, photo: String, groupIds: [Int!]!): String!,
  resetPassword(email: String!): String!,
  login(album: Int!, password: String!): String!
  editAccount(album: Int!, firstName: String, lastName: String, email: String, photo: String, groupIds: [Int]): String!
  changePassword(album: Int!, password: String!): String!
  assignUserToGroups(groupIds: [Int!]): String!
  addGroup(group: InputGroup): String!
  addClass(classData: InputClass): String!
}
`;

const resolvers = {
    Query: {
        hello: (_, { name }): string => `Hello ${name || 'World'}`,
        currentUser: authResolvers.currentUser,
        groups: groupsResolvers.groups,
        groupAttendances: groupsResolvers.groupAttendances,
        classAttendances: classResolvers.classAttendances,
    },
    Mutation: {
        register: authResolvers.register,
        resetPassword: authResolvers.resetPassword,
        login: authResolvers.login,
        editAccount: authResolvers.editAccount,
        changePassword: authResolvers.changePassword,
        assignUserToGroups: groupsResolvers.assignUserToGroups,
        addGroup: groupsResolvers.addGroup,
        addClass: classResolvers.addClass,
    },
};

export default {
    typeDefs,
    resolvers,
};
