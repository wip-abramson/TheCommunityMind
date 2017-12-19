import React from "react";
import { connect } from "react-redux";
import { compose, graphql } from "react-apollo";
import update from 'immutability-helper';
import Notifications from 'react-notification-system-redux';

import { unauthorizedErrorNotification } from '../../notifications/error.notifications';

import QuestionViewContainer from "./QuestionView/QuestionViewContainer";

import { setQuestionType, HOW } from '../../actions/AskQuestionPopup';

import HOWS_QUERY from "../../graphql/querys/hows.query";



const mapStateToProps = function (state) {
  return {
    currentWhy: state.currentWhy,
    currentWhatIf: state.currentWhatIf,
  }
};

// repeated across Why, WhatIf and How - is there a better way?
const mapDispatchToProps = (dispatch) => {
  return {
    setQuestionType: () => {
      dispatch(setQuestionType(HOW))
    },
    unAuthorized: () => {
      dispatch(Notifications.error(unauthorizedErrorNotification))
    }
  }
};

const ITEMS_PER_PAGE = 5;

const How = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  graphql(HOWS_QUERY, {
    options: (props) => ({
      variables: { parentId: props.currentWhatIf.id, first: ITEMS_PER_PAGE },
    }),
    props: ({ ownProps, data: { fetchMore, loading, error, hows } }) => ({
      loading,
      error,
      connection: hows,
      placeholder: "How ...?",
      refetchQuery: HOWS_QUERY,
      currentWhy: ownProps.currentWhy,
      currentWhatIf: ownProps.currentWhatIf,
      loadMoreEntries() {
        fetchMore({
          variables: {
            after: hows.edges[hows.edges.length - 1].cursor,

          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            // we will make an extra call to check if no more entries
            if (!fetchMoreResult) {
              return previousResult;
            }
            // push results (older whys) to end of whys list
            return update(previousResult, {

              hows: {
                edges: { $push: fetchMoreResult.hows.edges },
                pageInfo: { $set: fetchMoreResult.hows.pageInfo },
              },

            });
          }
        })
      },
    })
  }),
)(QuestionViewContainer);

export default How;
