import {gql} from '@apollo/client'

export const LOGIN = gql`
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      _id
      firstname
      lastname
      email
    }
  }
}
`;
export const ADD_USER = gql`
mutation AddUser($firstname: String!, $lastname: String!, $username: String!, $email: String!, $password: String!) {
  addUser(firstname: $firstname, lastname: $lastname, username: $username, email: $email, password: $password) {
    token
    user {
      _id
      firstname
      lastname
      email
    }
  }
}
`;

export const ADD_SCHEDULE = gql`
mutation AddSchedule($user: ID!, $date: String!, $startTime: String!, $endTime: String!) {
  addSchedule(user: $user, date: $date, startTime: $startTime, endTime: $endTime) {
    _id
    date
    startTime
    endTime
    user {
      _id
      username
    }
  }
}
`;

export const UPDATE_SCHEDULE_STATUS = gql`
mutation UpdateScheduleStatus($updateScheduleStatusId: ID!, $status: String!) {
  updateScheduleStatus(id: $updateScheduleStatusId, status: $status) {
    _id
    user {
      _id
      firstname
      lastname
    }
    status
  }
}
`;

export const REMOVE_SCHEDULE = gql`
mutation RemoveSchedule($removeScheduleId: ID!) {
  removeSchedule(id: $removeScheduleId) {
    _id
    user {
      _id
      username
    }
  }
}
`;

export const ADD_CALLOFF = gql`
mutation AddCalloff($userId: String!, $firstname: String!, $lastname: String!, $scheduleDate: String!, $startTime: String!, $endTime: String!) {
  addCalloff(userId: $userId, firstname: $firstname, lastname: $lastname, scheduleDate: $scheduleDate, startTime: $startTime, endTime: $endTime) {
    _id
    userId
    firstname
    lastname
    scheduleDate
    startTime
    endTime
  }
}
`;


