import React from "react";
import { connect } from "react-redux";
import { compose, graphql } from "react-apollo";
import update from 'immutability-helper';

import Notifications from 'react-notification-system-redux';
import { unauthorizedErrorNotification } from '../../notifications/error.notifications';

import QuestionViewContainer from "./QuestionView/QuestionViewContainer";
import { updateCurrentWhy } from "../../actions/Why";
import { setQuestionType, WHY } from '../../actions/QuestionPopup';

import WHYS_QUERY from "../../graphql/querys/whys.query";



const mapDispatchToProps = function (dispatch) {
  return {
    onSelectQuestion: (why) => {
      dispatch(updateCurrentWhy(why))
    },
    setQuestionType: () => {
      dispatch(setQuestionType(WHY))
    },
    unAuthorized: () => {
      console.log("DISPATCH UNAUTHORIZED")
      dispatch(Notifications.error(unauthorizedErrorNotification))
    }
  }
};

const ITEMS_PER_PAGE = 5;

const Why = compose(
  connect(
    null,
    mapDispatchToProps,
  ),

  graphql(WHYS_QUERY, {
    options: (props) => ({
      variables: {first: ITEMS_PER_PAGE},
      // pollInterval: 5000
    }),
    props: ({ ownProps, data: { fetchMore, loading, error, whys } }) => ({
      loading,
      error,
      connection: whys,
      onSelectQuestion: ownProps.onSelectQuestion,
      placeholder: "Why ...?",
      link: "/whatif",
      refetchQuery: WHYS_QUERY,
      currentWhy: null,
      currentWhatIf: null,
      // currentUser: ownProps.currentUser,
      loadMoreEntries() {
        fetchMore({
          variables: {
            after: whys.edges[whys.edges.length - 1].cursor,

          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            // we will make an extra call to check if no more entries
            if (!fetchMoreResult) {
              return previousResult;
            }
            // push results (older whys) to end of whys list
            return update(previousResult, {

                whys: {
                  edges: { $push: fetchMoreResult.whys.edges },
                  pageInfo: { $set: fetchMoreResult.whys.pageInfo },
                },

            });
          }
        })
      }
    })
  }),

)(QuestionViewContainer);

export default Why;
