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
    }

    this.changeView = this.changeView.bind(this);
  }

  changeView(viewType) {
    this.setState({ questionView: viewType })
  }

  render() {
    return (
      <UserQuestions
        whyEdges={this.props.whys.edges}
        whatIfEdges={this.props.whatIfs.edges}
        howEdges={this.props.hows.edges}
        latestQuestionEdges={this.props.latestQuestions.edges}
        staredQuestionEdges={this.props.staredQuestions.edges}
        questionView={this.state.questionView}
        onViewChange={this.changeView}
      />
    )

  }
}

UserQuestionsContainer.propTypes = {
  whys: PropTypes.shape({
    edges: PropTypes.array
  }),
  whatIfs: PropTypes.shape({
    edges: PropTypes.array
  }),
  hows: PropTypes.shape({
    edges: PropTypes.array
  }),
  latestQuestions: PropTypes.shape({
    edges: PropTypes.array
  }),
  staredQuestions: PropTypes.shape({
    edges: PropTypes.array
  })
}

export default UserQuestionsContainer;