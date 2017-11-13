import React from "react";
import { connect } from "react-redux";
import QuestionView from "./QuestionView/QuestionView";
import { compose, graphql } from "react-apollo";
import CREATE_HOW_MUTATION from "../../graphql/mutations/createHow.mutation";
import HOWS_QUERY from "../../graphql/querys/hows.query";

const mapStateToProps = function (state) {
  return {
    currentWhy: state.currentWhy,
    currentWhatIf: state.currentWhatIf,
  }
};

const createHow = graphql(CREATE_HOW_MUTATION, {
  props: ({ ownProps, mutate }) => ({
    createQuestion: ({ question }) => {
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
          const data = proxy.readQuery({ query: HOWS_QUERY, variables: { parentId: ownProps.currentWhatIf.id } });
          // Add how from the mutation to the beginning.
          data.hows.unshift(createHow);
          // Write our data back to the cache.
          proxy.writeQuery({ query: HOWS_QUERY, variables: { parentId: ownProps.currentWhatIf.id }, data });
        }
      }).catch(res => {
        // catches any error returned from mutation request
        const errors = res.graphQLErrors.map((error) => {
          console.log(error.message)
          return error;
        });
        return errors
        // this.setState({ errors });
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
)(QuestionView);

export default How;
