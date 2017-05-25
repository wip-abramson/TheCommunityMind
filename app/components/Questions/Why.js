import React from "react";
import { connect } from "react-redux";
import QuestionView from "./QuestionView/QuestionView";
import { updateCurrentWhy } from "../../actions/Why";
import { compose, graphql } from "react-apollo";
import CREATE_WHY_MUTATION from "../../graphql/createWhy.mutation";
import WHYS_QUERY from "../../graphql/whys.query";

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
  graphql(WHYS_QUERY, {
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
      refetchQuery: WHYS_QUERY,
      currentWhy: null,
      currentWhatIf: null,
    })
  }),
  graphql(CREATE_WHY_MUTATION, {
    name: 'createQuestionMutation',
    options: (props) => ({
      variables: { userId: 1 }
    })
  })
)(QuestionView);

export default Why;
