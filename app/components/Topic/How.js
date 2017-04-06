import React from "react";
import {connect} from "react-redux";
import QuestionView from "./QuestionView/QuestionView";
import {compose, graphql} from "react-apollo";
import {addHowMutation} from "../../queries/mutations";
import {howListQuery} from "../../queries/queries";

const mapStateToProps = function (state) {
  return {
    parentId: state.currentWhatIf.id
  }
}


const How = compose(
  connect(
    mapStateToProps,
    {}
  ),
  graphql(howListQuery, {
    options: (props) => ({
      variables: {parentId: props.parentId},
      pollInterval: 5000
    }),
    props: ({ownProps, data: {loading, error, hows}}) => ({
      loading,
      error,
      questions: hows,
      placeholder: "How ...?",
      refetchQuery: howListQuery,
    })
  }),
  graphql(addHowMutation, {
    options: (props) => ({
      variables: {whatIfId: props.parentId},
    }),
  })
)(QuestionView)


export default How;
