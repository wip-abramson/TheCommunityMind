/**
 * Created by will on 19/12/17.
 */
import React from 'react';
import { compose, graphql } from "react-apollo";

import SimpleQuestionInput from './QuestionInput/SimpleQuestionInput';

import CREATE_HOW_MUTATION from "../../graphql/mutations/createHow.mutation";
import HOWS_QUERY from "../../graphql/querys/hows.query";


const createHow = graphql(CREATE_HOW_MUTATION, {
  props: ({ ownProps, mutate }) => ({
    createQuestion: (question) => {
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
              staredByCurrentUser: false,
              watchedByCurrentUser: false,
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
          const query = {
            query: HOWS_QUERY,
            variables: { parentId: ownProps.currentWhatIf.id, first: 5 }
          };
          const data = proxy.readQuery(query);
          // Add how from the mutation to the beginning.
          const howEdge = {
            __typename: "HowEdge",
            node: createHow,
            cursor: Buffer.from(createHow.question.createdAt.toString()).toString('base64')
          };

          data.hows.edges.unshift(howEdge);

          query.data = data;
          // Write our data back to the cache.
          proxy.writeQuery(query);
        }
      }).catch(res => {
        // catches any error returned from mutation request
        const errors = res.graphQLErrors.map((error) => {
          // What about other errors?
          if (error.message === "Unauthorized") {
            this.props.unAuthorized();
          }
          return error;
        });
        return errors
      })
    }
  })
});

const HowQuestionInput = ({createQuestion}) =>
  <SimpleQuestionInput placeholder="How ...?" createQuestion={createQuestion}/>;

export default compose(createHow)(HowQuestionInput);