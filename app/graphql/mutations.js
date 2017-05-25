import {gql} from "react-apollo";

export const addUserMutation = gql`
  mutation AddUserMutation($username: String!, $password: String!, $email: String!) {
    addUser(username: $username, password: $password, email: $email) {
      id
      username
      email
    }
  }
`

export const loginMutation = gql`
  mutation LoginMutation($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      username
    }
  }
`
