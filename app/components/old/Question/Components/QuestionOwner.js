/**
 * Created by will on 20/03/18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router'

const QuestionOwner = ({ owner: {id, username} }) =>
  <span>
    <Link to={{pathname: "/profile", query: {userId: id}}} >
      {username}
    </Link>
  </span>;

QuestionOwner.propTypes = {
  owner: PropTypes.shape({
    id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired
};

export default QuestionOwner;