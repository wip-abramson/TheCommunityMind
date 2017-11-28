import React from "react";
import { connect } from "react-redux";
import QuestionViewContainer from "./QuestionView/QuestionViewContainer";
import { updateCurrentWhatIf } from "../../actions/WhatIf";
import { compose, graphql } from "react-apollo";
import CREATE_WHATIF_MUTATION from "../../graphql/mutations/createWhatIf.mutation";
import WHATIFS_QUERY from "../../graphql/querys/whatIfs.query";


import Notifications from 'react-notification-system-redux';
import { unauthorizedErrorNotification } from '../../notifications/error.notifications';

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
    unAuthorized: () => {
      console.log("DISPATCH UNAUTHORIZED")
      dispatch(Notifications.error(unauthorizedErrorNotification))
    }
  }
};

const createWhatIf = graphql(CREATE_WHATIF_MUTATION, {
  props: ({ ownProps, mutate }) => ({
    createQuestion: (question) => {
      return mutate({

        variables: { question, whyId: ownProps.currentWhy.id },
        optimisticResponse: {
          __typename: 'Mutation',
          createWhatIf: {
            __typename: 'WhatIf',
            id: "-1", // don't know id yet, but it doesn't matter
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
              },
            },

          },
        },
        update: (proxy, { data: { createWhatIf } }) => {
          // Read the data from our cache for this query.
          const query = {
            query: WHATIFS_QUERY,
            variables: {
              parentId: ownProps.currentWhy.id,
              // first: null,
              // after: null,
              // before: null,
              // last: null
            }
          };

          const data = proxy.readQuery(query);
          // Add whatIfEdge from the mutation to the beginning.

          const whatIfEdge = {
            __typename: "WhatIfEdge",
            node: createWhatIf,
            cursor: Buffer.from(createWhatIf.question.createdAt.toString()).toString('base64')
          };

          data.whatIfs.edges.unshift(whatIfEdge);
          // Write our data back to the cache.
          query.data = data;
          proxy.writeQuery(query);
        },
      }).catch(res => {
        // catches any error returned from mutation request
        const errors = res.graphQLErrors.map((error) => {
          if (error.message === "Unauthorized") {
            ownProps.unAuthorized();
          }
          return error;
        });
        return errors
        // this.setState({ errors });
      })
    }
  })
});

const WhatIf = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  graphql(WHATIFS_QUERY, {
    options: (props) => ({
      variables: { parentId: props.currentWhy.id },
      pollInterval: 5000
    }),
    props: ({ ownProps, data: { loading, error, whatIfs } }) => ({
      loading,
      error,
      connection: whatIfs,
      onSelectQuestion: ownProps.onSelectQuestion,
      placeholder: "What If ...?",
      link: "/how",
      refetchQuery: WHATIFS_QUERY,
      currentWhy: ownProps.currentWhy,
      currentWhatIf: null,
    })
  }),
  createWhatIf,
)(QuestionViewContainer);

export default WhatIf;
