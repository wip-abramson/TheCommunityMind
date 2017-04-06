import React from "react";
import {connect} from "react-redux";
import QuestionView from "./QuestionView/QuestionView";
import {updateCurrentWhy} from "../../actions/Why";
import {setTopicHeaderType, TOPIC_HEADERS} from "../../actions/TopicHeader";
import {compose, graphql} from "react-apollo";
import {addWhyMutation} from "../../queries/mutations";
import {whyListQuery} from "../../queries/queries";


const mapStateToProps = function (state) {
  return {
    parentId: state.currentTopic.id
  }
}
const mapDispatchToProps = function (dispatch) {
  return {
    onSelectQuestion: function (why) {
      console.log("Selecting Why", why)
      dispatch(updateCurrentWhy(why))
      dispatch(setTopicHeaderType(TOPIC_HEADERS.WHATIF))
    }
  }
}


const Why = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  graphql(whyListQuery, {
    options: (props) => ({
      variables: {parentId: props.parentId},
      pollInterval: 5000
    }),
    props: ({ownProps, data: {loading, error, whys}}) => ({
      loading,
      error,
      questions: whys,
      onSelectQuestion: ownProps.onSelectQuestion,
      placeholder: "Why ...?",
      link: "/whatif",
      refetchQuery: whyListQuery
    })
  }),
  graphql(addWhyMutation, {
    options: (props) => ({
      variables: {topicId: props.parentId}
    })
  })
)(QuestionView);


export default Why;
