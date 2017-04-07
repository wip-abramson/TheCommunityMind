import React from "react";
import TopicListItem from "./TopicListItem";
import {Col} from "react-bootstrap";
import {graphql} from "react-apollo";
import {topicListQuery} from "../../queries/queries";

function TopicList(props) {
  var style = {
    height: "100%",
    border: "2px solid grey"
  }

  var padding = {
    padding: 0
  }

  var component;

  if (props.loading) {
    component = <p>Loading ...</p>;
  }
  else if (props.error) {
    component = <p>{props.error.message}</p>;
  }
  else {
    component = props.topics.map(function (topic) {
      return (
        <TopicListItem
          key={topic.id}
          topic={topic}
          onSelectTopic={props.onSelectTopic}>
          {topic.name}
        </TopicListItem>)
    })
  }
  return (
    <Col sm={3} md={2} style={style}>
      <h3>{props.header}</h3>
      <ul style={padding}>
        {component}
      </ul>

    </Col>
  )
}


export default graphql(topicListQuery, {
  options: {pollInterval: 5000},
  props: ({ownProps, data: {loading, error, topics}}) => ({
    loading, error, topics, onSelectTopic: ownProps.onSelectTopic, header: ownProps.header
  })

})(TopicList);

