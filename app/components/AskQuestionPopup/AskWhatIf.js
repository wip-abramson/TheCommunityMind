/**
 * Created by will on 19/12/17.
 */
import React from 'react';
import { compose, graphql } from "react-apollo";
import CREATE_WHATIF_MUTATION from "../../graphql/mutations/createWhatIf.mutation";
import WHATIFS_QUERY from "../../graphql/querys/whatIfs.query";

import SimpleQuestionInput from './QuestionInput/SimpleQuestionInput';

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
              first: ITEMS_PER_PAGE,
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
          console.log(error);
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

const WhatIfQuestionInput = ({createQuestion}) =>
  <SimpleQuestionInput placeholder="What if ...?" createQuestion={createQuestion}/>;


export default compose(createWhatIf)(WhatIfQuestionInput);
