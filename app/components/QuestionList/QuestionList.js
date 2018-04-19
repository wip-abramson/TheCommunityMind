/**
 * Created by will on 23/04/17.
 */
import React from "react";
import PropTypes from 'prop-types'
import QuestionContainer from "../Question/QuestionContainer";

/**
 * Created a list of QuestionContainers for every question edge passed into it
 * @param props
 * @returns {XML}
 * @constructor
 */
const QuestionList = (props) => {
  var id =1;
  if (props.error) {
    return <div>error</div>
  }
  if (props.loading) {
    return <div>loading</div>
  }

  return (

    <div>
      {
        props.connection.edges.map(function (edge) {
        return (
          <QuestionContainer
            key={"id-" + (id ++)}
            // onSelectQuestion={props.onSelectQuestion}
            question={edge.node}
          >
          </QuestionContainer>)
      })}
      {props.connection.pageInfo.hasNextPage ? <button onClick={() => {props.loadMoreEntries()}}>Load More</button> : null}

    </div>
  )
};

QuestionList.propTypes = {
  connection: PropTypes.shape({
    edges: PropTypes.arrayOf(PropTypes.shape({
      node:  PropTypes.shape({
        id: PropTypes.string.isRequired,
        questionText: PropTypes.string.isRequired,
        stars: PropTypes.number.isRequired,
        owner: PropTypes.shape({
          id: PropTypes.string.isRequired,
          username: PropTypes.string.isRequired,
        }).isRequired

      }).isRequired,
      cursor: PropTypes.string,
    })),
    pageInfo: PropTypes.shape({
      hasNextPage: PropTypes.bool.isRequired,

    })
  }),


  onSelectQuestion: PropTypes.func,
  link: PropTypes.string,
  loadMoreEntries: PropTypes.func.isRequired,
};

export default QuestionList;