import React from "react";
import { connect } from "react-redux";
import QuestionView from "./QuestionView/QuestionView";
import { compose, graphql } from "react-apollo";
import CREATE_HOW_MUTATION from "../../graphql/createHow.mutation";
import HOWS_QUERY from "../../graphql/hows.query";

const mapStateToProps = function (state) {
  return {
    currentWhy: state.currentWhy,
    currentWhatIf: state.currentWhatIf
  }
}

const createHow = graphql(CREATE_HOW_MUTATION, {
  props: ({ ownProps, mutate }) => ({
    createQuestion: ({ userId, question }) => {
      return mutate({
        variables: { userId, question, whatIfId: ownProps.currentWhatIf.id },
        optimisticResponse: {
          __typename: 'Mutation',
          createHow: {
            __typename: 'How',
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
        update: (proxy, { data: { createHow } }) => {
          const data = proxy.readQuery({ query: HOWS_QUERY, variables: { parentId: ownProps.currentWhatIf.id } });
          // Add our comment from the mutation to the end.
          // console.log(proxy)

          data.hows.unshift(createHow);
          // Write our data back to the cache.
          proxy.writeQuery({ query: HOWS_QUERY, variables: { parentId: ownProps.currentWhatIf.id }, data });
        }
      })
    }
  })
});

const How = compose(
  connect(
    mapStateToProps,
    {}
  ),
  graphql(HOWS_QUERY, {
    options: (props) => ({
      variables: { parentId: props.currentWhatIf.id },
      pollInterval: 5000
    }),
    props: ({ ownProps, data: { loading, error, hows } }) => ({
      loading,
      error,
      questions: hows,
      placeholder: "How ...?",
      refetchQuery: HOWS_QUERY,
      currentWhy: ownProps.currentWhy,
      currentWhatIf: ownProps.currentWhatIf,
    })
  }),
  createHow,
)(QuestionView)

export default How;
