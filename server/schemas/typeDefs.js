const typeDefs = `
  type User {
    _id: ID
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
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addSchedule(user: ID!, date: String!, startTime: String!, endTime: String!): Schedule
    removeSchedule(id: ID!): Schedule
    
  }
`;

module.exports = typeDefs;
