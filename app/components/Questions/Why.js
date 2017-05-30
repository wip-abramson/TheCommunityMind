import React from "react";
import { connect } from "react-redux";
import QuestionView from "./QuestionView/QuestionView";
import { updateCurrentWhy } from "../../actions/Why";
import { compose, graphql } from "react-apollo";
import CREATE_WHY_MUTATION from "../../graphql/createWhy.mutation";
import WHYS_QUERY from "../../graphql/whys.query";
// import update from 'immutability-helper';

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

const createWhy = graphql(CREATE_WHY_MUTATION, {
  props: ({ ownProps, mutate }) => ({
    createQuestion: ({ userId, question }) => {
      console.log("Mutation", userId, question)
      return mutate({

        variables: { userId, question },
        optimisticResponse: {
          __typename: 'Mutation',
          createWhy: {
            __typename: 'Why',
            id: -1, // don't know id yet, but it doesn't matter
            question: {
              __typename: 'Question',
              id: -1,
              question: question,
              stars: 0,
              createdAt: new Date().toISOString(), // the time is now!
              owner: {
                __typename: 'User',
                id: 1, // still faking the user
                username: 'Justyn.Kautzer' // still faking the user
                // maybe we should stop faking the user soon!
              },
            }, // we know what the question will be

          },
        },
        update: (proxy, { data: { createWhy } }) => {
          console.log("created why", createWhy)
          // Read the data from our cache for this query.
          const data = proxy.readQuery({ query: WHYS_QUERY });
          // Add our comment from the mutation to the end.
          // console.log(proxy)

          data.whys.unshift(createWhy);
          // Write our data back to the cache.
          proxy.writeQuery({ query: WHYS_QUERY, data });
        },
      })
    }

  })
})

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
