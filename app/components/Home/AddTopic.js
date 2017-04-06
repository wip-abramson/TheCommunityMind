/**
 * Created by will on 29/03/17.
 */
import React from "react";
import {topicListQuery} from "../TopicList/TopicList";
import TextInput from "../generic/TextInput";
import {graphql} from "react-apollo";
import {addTopicMutation} from "../../queries/mutations";

const AddTopic = ({mutate}) => {
  const handleSubmit = (evt) => {
    // evt.persist();
    console.log(evt)
    mutate({
      variables: {name: evt.trim()},
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


const AddTopicWithMutation = graphql(
  addTopicMutation
)(AddTopic);

export default AddTopicWithMutation;