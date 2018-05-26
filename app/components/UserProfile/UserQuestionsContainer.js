/**
 * Created by will on 16/11/17.
 */
import React from 'react'
import PropTypes from 'prop-types'

import UserQuestions from './UserQuestions';

import { USERQUESTIONS } from './viewLabels';

class UserQuestionsContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      questionView: USERQUESTIONS,
    };

    this.changeView = this.changeView.bind(this);
  }

  changeView(viewType) {
    this.setState({ questionView: viewType })
  }

  render() {
    return (
      <UserQuestions
        user={this.props.user}
        questionView={this.state.questionView}
        onViewChange={this.changeView}
      />
    )

  }
}

UserQuestionsContainer.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired
  })
}

export default UserQuestionsContainer;