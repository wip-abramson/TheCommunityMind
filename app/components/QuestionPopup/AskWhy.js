/**
 * Created by will on 19/12/17.
 */
import React from 'react';
import { compose, graphql } from "react-apollo";

import QuestionInputContainer from './QuestionInput/QuestionInputContainer';
import CREATE_WHY_MUTATION from "../../graphql/mutations/createWhy.mutation";
import WHYS_QUERY from "../../graphql/querys/whys.query";


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
              starredByCurrentUser: false,
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
              first: 5,
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
      })
    }

  })
});

export default compose(createWhy)(QuestionInputContainer);