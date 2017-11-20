import React from "react";
import { connect } from "react-redux";
import QuestionView from "./QuestionView/QuestionView";
import { updateCurrentWhy } from "../../actions/Why";
import { compose, graphql } from "react-apollo";
import CREATE_WHY_MUTATION from "../../graphql/mutations/createWhy.mutation";
import WHYS_QUERY from "../../graphql/querys/whys.query";


import Notifications from 'react-notification-system-redux';
import { unauthorizedErrorNotification } from '../../notifications/error.notifications';


const mapDispatchToProps = function (dispatch) {
  return {
    onSelectQuestion: function (why) {
      dispatch(updateCurrentWhy(why))
    },
    unAuthorized: () => {
      console.log("DISPATCH UNAUTHORIZED")
      dispatch(Notifications.error(unauthorizedErrorNotification))
    }
  }
};

const createWhy = graphql(CREATE_WHY_MUTATION, {
  props: ({ ownProps, mutate }) => ({
    createQuestion: ( question, tagIds) => {
      return mutate({

        variables: { question, tagIds },
        optimisticResponse: {
          __typename: 'Mutation',
          createWhy: {
            __typename: 'Why',
            id: "-1",
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
        update: (proxy, { data: { createWhy } }) => {
          // Read the data from our cache for this query.
          const data = proxy.readQuery({ query: WHYS_QUERY });
          // Add why from the mutation to the beginning.
          console.log(createWhy)
          data.whys.unshift(createWhy);
          // Write our data back to the cache.
          proxy.writeQuery({ query: WHYS_QUERY, data });
        },
      }).catch(res => {
        // catches any error returned from mutation request
        // ownProps.unAuthorized();

        const errors = res.graphQLErrors.map((error) => {
          console.log(error.message)
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

const Why = compose(
  connect(
    null,
    mapDispatchToProps,
  ),

  graphql(WHYS_QUERY, {
    options: (props) => ({
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
      // currentUser: ownProps.currentUser,
    })
  }),
  createWhy,

)(QuestionView);

export default Why;
