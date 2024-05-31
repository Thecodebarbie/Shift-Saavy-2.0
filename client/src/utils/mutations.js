import {gql} from '@apollo/client'

export const LOGIN = gql`
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      _id
      email
      username
      managerId
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
mutation AddCalloff($schedule: ID!, $user: ID!, $status: String!) {
  addCalloff(schedule: $schedule, user: $user, status: $status) {
    _id
    schedule {
      _id
      user {
        _id
        username
      }
    }
    status
  }
}
`;

export const UPDATE_CALLOFF_STATUS = gql`
mutation UpdateCalloffStatus($updateCalloffStatusId: ID!, $status: String!) {
  updateCalloffStatus(id: $updateCalloffStatusId, status: $status) {
    _id
    schedule {
      _id
    }
    status
    user {
      _id
      username
    }
  }
}
`;

