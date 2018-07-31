import React, { Component } from 'react';
import { Tab } from 'semantic-ui-react'
import { connect } from 'react-redux';

class Home extends Component {
  render () {
    const { answered, unanswered } = this.props;

    const panes = [
      { menuItem: 'Answered', render: () => <Tab.Pane attached={false}>
        { answered.map(question => <div key={question.id}>{question.optionOne.text}{question.optionTwo.text}</div>) }
      </Tab.Pane> },
      { menuItem: 'Unanswered', render: () => <Tab.Pane attached={false}>
        { unanswered.map(question => <div key={question.id}>{question.optionOne.text}{question.optionTwo.text}</div>) }
      </Tab.Pane> },
    ]

    return (
      <Tab menu={{ pointing: true }} panes={panes} />
    )
  }
}

const mapStateToProps = ({ questions, authedUser, users, }) => {
  const answered = Object.keys(users[authedUser].answers)
    .map(questionID => questions[questionID]);
  const unanswered = Object.keys(questions)
    .filter(question => !answered.includes(question.id))
    .map(questionID => questions[questionID]);

  return {
    answered,
    unanswered
  }
};

export default connect(mapStateToProps)(Home);