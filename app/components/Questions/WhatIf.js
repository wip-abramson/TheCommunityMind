import React from "react";
import { connect } from "react-redux";
import QuestionView from "./QuestionView/QuestionView";
import { updateCurrentWhatIf } from "../../actions/WhatIf";
import { compose, graphql } from "react-apollo";
import CREATE_WHATIF_MUTATION from "../../graphql/createWhatIf.mutation";
import WHATIFS_QUERY from "../../graphql/whatIfs.query";

const mapStateToProps = function (state) {
  // console.log("Getting current why", state.currentWhy);
  return {

    currentWhy: state.currentWhy,
  }
}

const mapDispatchToProps = function (dispatch) {
  return {
    onSelectQuestion: function (whatIf) {
      dispatch(updateCurrentWhatIf(whatIf))
    }
  }
}

const createWhatIf = graphql(CREATE_WHATIF_MUTATION, {
  props: ({ ownProps, mutate }) => ({
    createQuestion: ({ userId, question }) => {
      console.log("WhatIfMutation", userId, question, ownProps.currentWhy.id)
      return mutate({

        variables: { userId, question, whyId: ownProps.currentWhy.id },
        optimisticResponse: {
          __typename: 'Mutation',
          createWhatIf: {
            __typename: 'WhatIf',
            id: "", // don't know id yet, but it doesn't matter
            question: {
              __typename: 'Question',
              id: "",
              question: question,
              stars: 0,
              createdAt: new Date().toISOString(), // the time is now!
              owner: {
                __typename: 'User',
                id: "", // still faking the user
                username: 'Justyn.Kautzer' // still faking the user
                // maybe we should stop faking the user soon!
              },
            }, // we know what the question will be

          },
        },
        update: (proxy, { data: { createWhatIf } }) => {
          // Read the data from our cache for this query.
          const data = proxy.readQuery({ query: WHATIFS_QUERY, variables: { parentId: ownProps.currentWhy.id } });
          // Add our comment from the mutation to the end.
          // console.log(proxy)

          data.whatIfs.unshift(createWhatIf);
          // Write our data back to the cache.
          proxy.writeQuery({ query: WHATIFS_QUERY, variables: { parentId: ownProps.currentWhy.id }, data });
        },
      })
    }

  })
})

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
      questions: whatIfs,
      onSelectQuestion: ownProps.onSelectQuestion,
      placeholder: "What If ...?",
      link: "/how",
      refetchQuery: WHATIFS_QUERY,
      currentWhy: ownProps.currentWhy,
      currentWhatIf: null,
    })
  }),
  createWhatIf,
)(QuestionView)

export default WhatIf;
