import authResolvers from 'modules/auth/resolvers';
import groupsResolvers from 'modules/groups/resolvers';
import classResolvers from 'modules/classes/resolvers';
import attendancesResolvers from 'modules/attendances/resolvers';
import userGradesResolvers from 'modules/user-grades/resolvers';
import usersResolvers from 'modules/users/resolvers';
import consultationResolvers from 'modules/consultation-slots/resolvers';
import questionnairesResolvers from 'modules/questionnaires/resolvers';
import thesesResolvers from 'modules/theses/resolvers';

const typeDefs = `
scalar Date
scalar Upload
type File {
  id: ID!
  path: String!
  filename: String!
  mimetype: String!
  encoding: String!
}
input InputThesisVolunteer {
  thesisId: Int!
  userId: Int!
  createdOn: Date
}
input InputThesis {
  id: ID
  type: String!
  year: Int
  graduateName: String
  graduateId: Int
  consultantName: String
  consultantId: Int
  title: String!
  usedTechnologies: String
  goal: String
  sketch: String
  link: String
  isFavourite: Boolean
}
input InputReportAttendance {
  id: ID
  groupId: Int!
  classId: Int!
  userId: Int!
}
input InputUserGrade {
  id: Int
  groupId: Int!
  userId: Int!
  grade: Int!
  gradedOn: Date
}
input InputAttendance {
  id: Int
  groupId: Int!
  classId: Int!
  userId: Int!
  reportAddedOn: Date
  reportGrade: Int
  reportFile: String
  isPresent: Boolean
}
input InputClass {
  id: Int
  groupId: Int
  classNumber: Int
  takenOn: Date
  title: String
  isReportRequired: Boolean
}
input InputRemoveClass {
  id: Int!
  groupId: Int!
}
input InputGroup {
  id: ID
  modeOfStudy: String!
  fieldOfStudy: String!
  groupNumber: String!
  groupHalf: String!
  courseName: String!
  link: String
  description: String
  isActive: Boolean
}
type ThesisVolunteer {
  id: ID!
  thesisId: Int!
  userId: Int!
  createdOn: Date!
  user: User
  thesis: Thesis
}
type Thesis {
  id: ID!
  type: String!
  year: Int
  graduateName: String
  graduateId: Int
  consultantName: String
  consultantId: Int
  title: String!
  usedTechnologies: String
  goal: String
  sketch: String
  link: String
  isFavourite: Boolean
  user: User
  volunteers: [ThesisVolunteer]
}
type Questionnaire {
  id: ID!
  createdOn: Date!
  groupId: Int
  grade: Int!
  speed: Int!
  value: Int!
  comments: String
}
type ConsultationSlot {
  id: ID!
  date: Date!
  slot: Int!
  userId: Int
  userName: String
}
type ClassAttendance {
  id: ID!
  classId: Int!
  groupId: Int!
  userId: Int!
  isPresent: Boolean!
  reportFile: String
  reportGrade: Int
  reportAddedOn: Date
}
type ClassAttendanceDetailed {
  id: ID!
  classId: Int!
  groupId: Int!
  userId: Int!
  isPresent: Boolean!
  reportFile: String
  reportGrade: Int
  reportAddedOn: Date
  groupName: String
  classTitle: String
  userName: String
}
type UserGrade {
  id: Int!
  groupId: Int!
  userId: Int!
  grade: Int!
  gradedOn: Date
}
type Class {
  id: Int!
  groupId: Int!
  classNumber: Int!
  takenOn: Date
  title: String!
  isReportRequired: Boolean
  attendances: [ClassAttendance]
  group: Group
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
  grades: [UserGrade]!
  attendances: [ClassAttendance]
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
  grades: [UserGrade]!
}
type Query {
  hello(name: String): String!
  currentUser(album: Int): User!
  group(id: ID!): Group!
  groups(isActive: Boolean): [Group]!
  groupAttendances(id: ID!): [ClassAttendance]!
  classAttendances(id: ID!): [ClassAttendance]!
  userClassAttendances(id: ID!): [ClassAttendance]!
  class(id: Int!, groupId: Int!): Class
  pendingReports(activeGroups: Boolean): [ClassAttendanceDetailed]!
  consultationSlots(forHowManyWeeks: Int!): [ConsultationSlot]!
  questionnaires: [Questionnaire]!
  users: [User]!
  theses: [Thesis]!
  thesesVolunteers: [ThesisVolunteer]!
}
type Mutation {
  register(album: Int!, firstName: String!, lastName: String!, email: String!, password: String!, photo: String, groupIds: [Int!]!): String!,
  resetPassword(email: String!): String!,
  login(album: Int!, password: String!): String!
  editAccount(album: Int!, firstName: String, lastName: String, email: String, photo: String, groupIds: [Int]): String!
  changePassword(album: Int!, password: String!): String!
  assignUserToGroups(groupIds: [Int!]): String!
  addGroup(group: InputGroup): String!
  putGroup(group: InputGroup): String!
  addClass(classData: InputClass): String!
  putClass(classData: InputClass): String!
  removeClass(classData: InputRemoveClass): String!
  putAttendance(attendance: InputAttendance): ClassAttendance!
  putUserGrade(grade: InputUserGrade): UserGrade!
  uploadReport(file: Upload!, attendance: InputReportAttendance!): ClassAttendance!
  removeReport(attendance: InputReportAttendance!): ClassAttendance!
  sendUserEmail(id: Int!, message: String!, title: String): String!
  sendGroupEmail(id: Int!, message: String!, title: String): String!
  removeConsultationSlot(id: ID!): String!
  reserveConsultationSlot(slot: Int!, date: Date!): ConsultationSlot
  addQuestionnaire(grade: Int!, speed: Int!, value: Int!, comments: String, groupId: Int): Questionnaire
  putThesis(input: InputThesis): Thesis!
  removeThesis(id: ID!): String!
  addThesisVolunteer(input: InputThesisVolunteer): ThesisVolunteer!
  removeThesisVolunteer(id: ID!): String!
  acceptThesisVolunteer(id: ID!): String!
}
`;

const resolvers = {
    Query: {
        hello: (_, { name }): string => `Hello ${name || 'World'}`,
        currentUser: authResolvers.currentUser,
        group: groupsResolvers.group,
        groups: groupsResolvers.groups,
        class: classResolvers.getClass,
        groupAttendances: groupsResolvers.groupAttendances,
        classAttendances: attendancesResolvers.classAttendances,
        userClassAttendances: attendancesResolvers.userClassAttendances,
        pendingReports: attendancesResolvers.pendingReports,
        consultationSlots: consultationResolvers.consultationSlots,
        questionnaires: questionnairesResolvers.questionnaires,
        users: usersResolvers.users,
        theses: thesesResolvers.theses,
        thesesVolunteers: thesesResolvers.thesesVolunteers,
    },
    Mutation: {
        register: authResolvers.register,
        resetPassword: authResolvers.resetPassword,
        login: authResolvers.login,
        editAccount: authResolvers.editAccount,
        changePassword: authResolvers.changePassword,
        assignUserToGroups: groupsResolvers.assignUserToGroups,
        addGroup: groupsResolvers.addGroup,
        putGroup: groupsResolvers.putGroup,
        addClass: classResolvers.addClass,
        putClass: classResolvers.putClass,
        removeClass: classResolvers.removeClass,
        putAttendance: attendancesResolvers.putAttendance,
        putUserGrade: userGradesResolvers.putUserGrade,
        uploadReport: attendancesResolvers.uploadReport,
        removeReport: attendancesResolvers.removeReport,
        sendUserEmail: usersResolvers.sendUserEmail,
        sendGroupEmail: groupsResolvers.sendGroupEmail,
        removeConsultationSlot: consultationResolvers.removeConsultationSlot,
        reserveConsultationSlot: consultationResolvers.reserveConsultationSlot,
        addQuestionnaire: questionnairesResolvers.addQuestionnaire,
        putThesis: thesesResolvers.putThesis,
        removeThesis: thesesResolvers.removeThesis,
        addThesisVolunteer: thesesResolvers.addThesisVolunteer,
        removeThesisVolunteer: thesesResolvers.removeThesisVolunteer,
        acceptThesisVolunteer: thesesResolvers.acceptThesisVolunteer,
    },
};

export default {
    typeDefs,
    resolvers,
};
