import React from "react";
import { connect } from "react-redux";
import { compose, graphql } from "react-apollo";
import update from 'immutability-helper';

import Notifications from 'react-notification-system-redux';
import { unauthorizedErrorNotification } from '../../notifications/error.notifications';

import QuestionViewContainer from "./QuestionView/QuestionViewContainer";

import { updateCurrentWhatIf } from "../../actions/WhatIf";
import {setQuestionType, WHATIF } from '../../actions/QuestionPopup';

import WHATIFS_QUERY from "../../graphql/querys/whatIfs.query";


const mapStateToProps = function (state) {

  return {
    currentWhy: state.currentWhy,
  }
};

const mapDispatchToProps = function (dispatch) {
  return {
    onSelectQuestion: function (whatIf) {
      dispatch(updateCurrentWhatIf(whatIf))
    },
    setQuestionType: () => {
      dispatch(setQuestionType(WHATIF))
    },
    unAuthorized: () => {
      console.log("DISPATCH UNAUTHORIZED")
      dispatch(Notifications.error(unauthorizedErrorNotification))
    }
  }
};

const ITEMS_PER_PAGE = 5;

const WhatIf = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  graphql(WHATIFS_QUERY, {
    options: (props) => {
      return ({
      variables: { parentId: props.currentWhy.id, first: ITEMS_PER_PAGE },
    })},
    props: ({ ownProps, data: { fetchMore, loading, error, whatIfs } }) => ({
      loading,
      error,
      connection: whatIfs,
      onSelectQuestion: ownProps.onSelectQuestion,
      placeholder: "What If ...?",
      link: "/how",
      // refetchQuery: WHATIFS_QUERY,
      currentWhy: ownProps.currentWhy,
      currentWhatIf: null,
      loadMoreEntries() {
        fetchMore({
          variables: {
            after: whatIfs.edges[whatIfs.edges.length - 1].cursor,

          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            // we will make an extra call to check if no more entries
            if (!fetchMoreResult) {
              return previousResult;
            }
            // push results (older whys) to end of whys list
            return update(previousResult, {

              whatIfs: {
                edges: { $push: fetchMoreResult.whatIfs.edges },
                pageInfo: { $set: fetchMoreResult.whatIfs.pageInfo },
              },

            });
          }
        })
      }
    })
  }),
)(QuestionViewContainer);

export default WhatIf;
