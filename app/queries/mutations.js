import {gql} from "react-apollo";

export const addWhatIfMutation = gql`
    mutation AddWhatIfMutation($question: String!, $whyId: ID!) {
        addWhatIf(question: $question, whyId: $whyId) {
           id
           question
        }
    }
`
export const addWhyMutation = gql`
    mutation AddWhyMutation($question: String!) {
        addWhy(question: $question) {
           id
           question
        }
    }
`

export const addHowMutation = gql`
    mutation AddHowMutation($question: String!, $whatIfId: ID!) {
        addHow(question: $question, whatIfId: $whatIfId) {
            id
            question
        }
    }
`

export const addTopicMutation = gql`
  mutation addTopic($name: String!) {
    addTopic(name: $name) {
      id
      name
    }
  }
`;