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
  }


  type Calloff {
    _id: ID
    schedule: Schedule
    user: User
    status: String
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
    userCalloffs(user: ID!): [Calloff]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(firstname: String!,lastname: String!,username: String!, email: String!, password: String!): Auth
    addSchedule(user: ID!, date: String!, startTime: String!, endTime: String!): Schedule
    removeSchedule(id: ID!): Schedule
    addCalloff(schedule: ID!, user: ID!, status: String!): Calloff
    updateCalloffStatus(id: ID!, status: String!): Calloff
  }
`;

module.exports = typeDefs;
