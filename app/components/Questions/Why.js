import React from "react";
import { connect } from "react-redux";
import QuestionView from "./QuestionView/QuestionView";
import { updateCurrentWhy } from "../../actions/Why";
import { compose, graphql } from "react-apollo";
import { addWhyMutation } from "../../graphql/mutations";
import { whyListQuery } from "../../graphql/queries";

const mapStateToProps = function (state) {
  return {
    // parentId: state.currentTopic.id
  }
}
const mapDispatchToProps = function (dispatch) {
  return {
    onSelectQuestion: function (why) {
      console.log("Selecting Why", why)
      dispatch(updateCurrentWhy(why))
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
      // variables: {parentId: props.parentId},
      pollInterval: 5000
    }),
    props: ({ ownProps, data: { loading, error, whys } }) => ({
      loading,
      error,
      questions: whys,
      onSelectQuestion: ownProps.onSelectQuestion,
      placeholder: "Why ...?",
      link: "/whatif",
      refetchQuery: whyListQuery,
      currentWhy: null,
      currentWhatIf: null,
    })
  }),
  graphql(addWhyMutation, {
    name: 'addQuestionMutation',
    options: (props) => ({
      variables: { topicId: props.parentId }
    })
  })
)(QuestionView);

export default Why;
