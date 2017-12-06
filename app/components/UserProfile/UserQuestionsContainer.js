/**
 * Created by will on 16/11/17.
 */
import React from 'react'
import PropTypes from 'prop-types'

import UserQuestions from './UserQuestions';

import { LATEST } from './viewLabels';

class UserQuestionsContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      questionView: LATEST,
    };

    this.changeView = this.changeView.bind(this);
  }

  changeView(viewType) {
    this.setState({ questionView: viewType })
  }

  render() {
    return (
      <UserQuestions
        userId={this.props.user.id}
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