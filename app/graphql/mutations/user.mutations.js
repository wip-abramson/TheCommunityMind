import gql from 'graphql-tag';
export const addUserMutation = gql`
  mutation AddUserMutation($username: String!, $password: String!, $email: String!) {
    register(username: $username, password: $password, email: $email) {
      id
      username
      email
      jwt
    }
  }
`

export const loginMutation = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      username
      jwt
    }
  }
`
