/**
 * Created by will on 16/11/17.
 */
import React from 'react'
import UserQuestions from './UserQuestions';

class UserQuestionsContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      questionView: "WHYS",
    }


    this.changeView = this.changeView.bind(this);
  }

  changeView(viewType) {
    this.setState({questionView: viewType})
  }

  render() {
    return (
      <UserQuestions
        whys={this.props.whys}
        whatIfs={this.props.whatIfs}
        hows={this.props.hows}
        latestQuestions={this.props.latestQuestions}
        questionView={this.state.questionView}
        onViewChange={this.changeView}
      />
      )

  }
}

export default UserQuestionsContainer;