/**
 * Created by will on 13/11/17.
 */
import React from 'react'
import { compose, graphql } from "react-apollo";

import STAR_QUESTION_MUTATION from '../../../../graphql/mutations/starQuestion.mutation';

import Question from './Question';

const starQuestion = graphql(STAR_QUESTION_MUTATION, {
  props: ({ ownProps, mutate }) => ({
    starQuestion: ({ question }) => {
      console.log("Star Question")
      return mutate({
        variables: { id: question.id },
        optimisticResponse: {
          __typename: 'Mutation',
          starQuestion: {
            id: question.id,
            __typename: 'Question',
            stars: question.stars + 1,
            question: question.question,
            staredByCurrentUser: true
          }
        },

        // update: (proxy, { data: { query: ownProps.refetchQuery } }) => {
        //   const data = proxy.readQuery({ query: query, variables: { parentId: ownProps.currentWhatIf.id } });
        //   // Add how from the mutation to the beginning.
        //   data.hows.unshift(createHow);
        //   // Write our data back to the cache.
        //   proxy.writeQuery({ query: HOWS_QUERY, variables: { parentId: ownProps.currentWhatIf.id }, data });
        // }

      })
        .catch(res => {
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
})

const QuestionContainer = compose(starQuestion)(Question);

export default QuestionContainer;