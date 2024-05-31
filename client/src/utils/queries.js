import {gql} from '@apollo/client'

export const QUERY_ME = gql`
query Me {
  me {
    _id
    email
    username
    managerId
  }
}
`;

export const QUERY_USERS = gql`
query Users {
  users {
    _id
    email
    username
  }
}
`;

export const QUERY_SCHEDULES =gql`
query Schedules {
  schedules {
    _id
    date
    endTime
    startTime
    user {
      _id
      username
    }
  }
}
`;

export const QUERY_USER_SCHEDULES = gql`
query UserSchedules($user: ID!) {
  userSchedules(user: $user) {
    _id
    date
    endTime
    startTime
    user {
      _id
      username
    }
  }
}
`;


export const QUERY_SCHEDULES_BY_DATE = gql`
query GetSchedulesByDate($date: String!) {
  getSchedulesByDate(date: $date) {
    _id
    user {
      username
    }
    startTime
    endTime
  }
}
`;


export const QUERY_USER_CALLOFFS = gql`
query UserCalloffs($user: ID!) {
  userCalloffs(user: $user) {
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