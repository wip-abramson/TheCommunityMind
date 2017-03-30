import React from 'react'
import { Link } from 'react-router'
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
    if (props.loading) {
        return <p>Loading ...</p>;
    }
    if (props.error) {
        return <p>{props.error.message}</p>;
    }
  return (
    <Col sm={3} md={2} style={style}>
      <ul>
        {props.topics.map(function(topic) {
          return (
            <li key={topic.id}>
              <Link
                onClick={() => {
                  console.log("Selecting topic")
                  props.onSelectTopic(topic)
                }}
                to='topic'>
                {topic.name}
              </Link>
          </li>)
        })}
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

