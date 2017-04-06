/**
 * Created by will on 29/03/17.
 */
import React from 'react'
import {topicListQuery} from './TopicList'
import TextInput from './generic/TextInput'
import {
  graphql,
  gql
} from 'react-apollo'

const AddTopic = ({mutate}) => {
  const handleSubmit = (evt) => {
    // evt.persist();
    console.log(evt)
    mutate({
      variables: {name: evt},
      refetchQueries: [{query: topicListQuery}]
    })
      .then(res => {
        evt = "";
      });
  }

  return (
    <TextInput
      onSubmit={handleSubmit}
      submitName="Add Topic"
      placeholder="New topic"
    />
  )
}

const addTopicMutation = gql`
  mutation addTopic($name: String!) {
    addTopic(name: $name) {
      id
      name
    }
  }
`;

const AddTopicWithMutation = graphql(
  addTopicMutation
)(AddTopic);

export default AddTopicWithMutation;