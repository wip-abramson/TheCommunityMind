import React from "react";
import { connect } from "react-redux";
import QuestionViewContainer from "./QuestionView/QuestionViewContainer";
import { updateCurrentWhy } from "../../actions/Why";
import { compose, graphql } from "react-apollo";
import CREATE_WHY_MUTATION from "../../graphql/mutations/createWhy.mutation";
import WHYS_QUERY from "../../graphql/querys/whys.query";
import update from 'immutability-helper';



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

const ITEMS_PER_PAGE = 2;

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
          const query = { query: WHYS_QUERY,
            variables: {
            first: ITEMS_PER_PAGE,
            // after: null,
            // before: null,
            // last: null
          }
          }
          const data = proxy.readQuery(query);
          // Add why from the mutation to the beginning.

          const whyEdge = {
            __typename: "WhyEdge",
            node: createWhy,
            cursor: Buffer.from(createWhy.question.createdAt.toString()).toString('base64')
          };

          data.whys.edges.unshift(whyEdge);
          // Write our data back to the cache.
          query.data = data;
          proxy.writeQuery(query);
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
  createWhy,

)(QuestionViewContainer);

export default Why;
