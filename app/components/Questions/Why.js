import React from "react";
import { connect } from "react-redux";
import QuestionView from "./QuestionView/QuestionView";
import { updateCurrentWhy } from "../../actions/Why";
import { compose, graphql } from "react-apollo";
import CREATE_WHY_MUTATION from "../../graphql/createWhy.mutation";
import WHYS_QUERY from "../../graphql/whys.query";

const mapStateToProps = function () {
  return {
    // parentId: state.currentTopic.id
  }
};
const mapDispatchToProps = function (dispatch) {
  return {
    onSelectQuestion: function (why) {
      dispatch(updateCurrentWhy(why))
    }
  }
};

const createWhy = graphql(CREATE_WHY_MUTATION, {
  props: ({ ownProps, mutate }) => ({
    createQuestion: ({ question }) => {
      return mutate({

        variables: { question },
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

          data.whys.unshift(createWhy);
          // Write our data back to the cache.
          proxy.writeQuery({ query: WHYS_QUERY, data });
        },
      })
    }

  })
});

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
  createWhy,

)(QuestionView);

export default Why;
