import React from 'react'
import { connect } from 'react-redux'
import QuestionView from '../components/QuestionView'
import { addWhy, updateCurrentWhy } from '../actions/Why'
import { setTopicHeaderType, TOPIC_HEADERS } from '../actions/TopicHeader'
import {
    gql,
    graphql
} from 'react-apollo'


const mapStateToProps =  function(state) {
    return {
        questions: state.whys,

    }
}
const mapDispatchToProps = function(dispatch) {
  return {
    onAskQuestion: function(question) {
      console.log("Dispatching add why")
      dispatch(addWhy(question))
    },
    onSelectQuestion:function(why) {
      console.log("Selecting Why", why)
      dispatch(updateCurrentWhy(why))
      dispatch(setTopicHeaderType(TOPIC_HEADERS.WHATIF))
    }
  }
}

const whyListQuery = gql`
  query WhyListQuery {
    whys {
      question
       id
     }
   }
`;

const WhyView = graphql(whyListQuery, {
  options: {pollInterval: 5000},
  props: ({ ownProps, data: {loading, error, whys} }) => ({
    loading, error, whys, questions: whys, onSelectQuestion: ownProps.onSelectQuestion, placeholder: "Why ...?", link: "/why"
  })
})(QuestionView);

const WhyContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(WhyView);

export default WhyContainer;
