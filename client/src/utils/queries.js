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