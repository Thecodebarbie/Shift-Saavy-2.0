const typeDefs = `
  type User {
    _id: ID
    firstname: String!
    lastname: String!
    username: String!
    email: String!
    managerId: Int
  }

  type Schedule {
    _id: ID
    user: User
    date: String
    startTime: String
    endTime: String
    status: String
  }


  type Calloff {
    _id: ID
    userId: ID
    scheduleId: ID
    firstname: String
    lastname: String
    scheduleDate: String
    startTime: String
    endTime: String
  }


  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    users: [User]
    schedules: [Schedule]
    schedule(id:ID!) : Schedule
    userSchedules(user: ID!): [Schedule]
    getSchedulesByDate(date: String!): [Schedule]
    userCalloffs(userId: ID!): [Calloff]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(firstname: String!,lastname: String!,username: String!, email: String!, password: String!): Auth
    addSchedule(user: ID!, date: String!, startTime: String!, endTime: String!, status: String!): Schedule
    updateScheduleStatus(id: ID!, status: String!): Schedule
    removeSchedule(id: ID!): Schedule
    addCalloff(userId:ID!, scheduleId:ID!, firstname: String!, lastname: String!, scheduleDate: String!,
      startTime: String!, endTime: String!): Calloff
      removeCalloff(id: ID!): Boolean!
  }
`;

module.exports = typeDefs;
