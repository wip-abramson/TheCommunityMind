import React from "react";
import { connect } from "react-redux";
import QuestionViewContainer from "./QuestionView/QuestionViewContainer";
import { compose, graphql } from "react-apollo";
import CREATE_HOW_MUTATION from "../../graphql/mutations/createHow.mutation";
import HOWS_QUERY from "../../graphql/querys/hows.query";
import update from 'immutability-helper';

import Notifications from 'react-notification-system-redux';
import { unauthorizedErrorNotification } from '../../notifications/error.notifications';

const mapStateToProps = function (state) {
  return {
    currentWhy: state.currentWhy,
    currentWhatIf: state.currentWhatIf,
  }
};

// repeated across Why, WhatIf and How - is there a better way?
const mapDispatchToProps = (dispatch) => {
  return {
    unAuthorized: () => {
      dispatch(Notifications.error(unauthorizedErrorNotification))
    }
  }
};

const ITEMS_PER_PAGE = 5;

const createHow = graphql(CREATE_HOW_MUTATION, {
  props: ({ ownProps, mutate }) => ({
    createQuestion: (question) => {
      return mutate({
        variables: { question, whatIfId: ownProps.currentWhatIf.id },
        optimisticResponse: {
          __typename: 'Mutation',
          createHow: {
            __typename: 'How',
            id: "-1", // fake id
            question: {
              __typename: 'Question',
              id: "-1",
              question: question,
              stars: 0,
              staredByCurrentUser: false,
              watchedByCurrentUser: false,
              createdAt: new Date().toISOString(), // the time is now!
              owner: {
                __typename: 'User',
                id: "-1", // still faking the user
                username: 'Justyn.Kautzer' // still faking the user
                // maybe we should stop faking the user soon!
              },
            },

          },
        },
        update: (proxy, { data: { createHow } }) => {
          const query = {
            query: HOWS_QUERY,
            variables: { parentId: ownProps.currentWhatIf.id, first: ITEMS_PER_PAGE }
          };
          const data = proxy.readQuery(query);
          // Add how from the mutation to the beginning.
          const howEdge = {
            __typename: "HowEdge",
            node: createHow,
            cursor: Buffer.from(createHow.question.createdAt.toString()).toString('base64')
          };

          data.hows.edges.unshift(howEdge);

          query.data = data;
          // Write our data back to the cache.
          proxy.writeQuery(query);
        }
      }).catch(res => {
        // catches any error returned from mutation request
        const errors = res.graphQLErrors.map((error) => {
          // What about other errors?
          if (error.message === "Unauthorized") {
            this.props.unAuthorized();
          }
          return error;
        });
        return errors
      })
    }
  })
});

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
  createHow,
)(QuestionViewContainer);

export default How;
