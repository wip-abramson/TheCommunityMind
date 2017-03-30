import React from 'react'
import { connect } from 'react-redux'
import QuestionView from '../components/QuestionView'
import { updateCurrentWhy } from '../actions/Why'
import { setTopicHeaderType, TOPIC_HEADERS } from '../actions/TopicHeader'
import {
    compose,
    gql,
    graphql
} from 'react-apollo'


const mapStateToProps =  function(state) {
    return {
        topicId: state.currentTopic.id
    }
}
const mapDispatchToProps = function(dispatch) {
  return {
    onSelectQuestion:function(why) {
      console.log("Selecting Why", why)
      dispatch(updateCurrentWhy(why))
      dispatch(setTopicHeaderType(TOPIC_HEADERS.WHATIF))
    }
  }
}

export const whyListQuery = gql`
  query WhyListQuery($topicId: ID!) {
    whys(topicId: $topicId) {
        id
        question
     }
   }
`;

export const addWhyMutation = gql`
    mutation AddWhyMutation($question: String!, $topicId: ID!) {
        addWhy(question: $question, topicId: $topicId) {
           id
           question
        }
    }
`

const Why = compose(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    ),
    graphql(whyListQuery, {
       options:  (props) => ({
           variables: {topicId: props.topicId},
           pollInterval: 5000
       }),
      props: ({ ownProps, data: {loading, error, whys} }) => ({
          loading,
          error,
          questions: whys,
          onSelectQuestion: ownProps.onSelectQuestion,
          placeholder: "Why ...?",
          link: "/why",
          refetchQuery: whyListQuery
      })
    }),
    graphql(addWhyMutation, {
        options: (props) => ({
            variables: {topicId: props.topicId}
        })
    })

)(QuestionView);


export default Why;
