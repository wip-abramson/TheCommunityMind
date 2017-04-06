import React from 'react'
import TopicListItem from './TopicListItem'
import { Col } from 'react-bootstrap'
import {
    gql,
    graphql
} from 'react-apollo'

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
    if (props.error) {
        component = <p>{props.error.message}</p>;
    }
    if (!props.loading & !props.error) {
        component = props.topics.map(function(topic) {
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
        <h3>Topics</h3>
      <ul style={padding}>
          {component}
      </ul>
    </Col>
  )
}

export const topicListQuery = gql`
  query TopicListQuery {
    topics {
      id
      name
    }
  }
`;

export default graphql(topicListQuery, {
    options:  { pollInterval: 5000 },
    props: ({ ownProps, data: { loading, error, topics } }) => ({
        loading, error, topics, onSelectTopic: ownProps.onSelectTopic})

})(TopicList);

