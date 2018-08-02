import React, { Component } from 'react';
import { Tab } from 'semantic-ui-react'
import { connect } from 'react-redux';
import QuestionPreview from './QuestionPreview';

class Home extends Component {
  render () {
    const { answered, unanswered } = this.props;

    const panes = [
      { menuItem: 'Answered', render: () => <Tab.Pane attached={false}>
        {answered.map(question => <QuestionPreview key={question.id} id={question.id}/>) }
      </Tab.Pane> },
      { menuItem: 'Unanswered', render: () => <Tab.Pane attached={false}>
        {unanswered.map(question => <QuestionPreview key={question.id} id={question.id} />) }
      </Tab.Pane> }
    ]

    return (
      <Tab menu={{ pointing: true }} panes={panes} />
    )
  }
}

const mapStateToProps = ({ questions, authedUser, users, }) => {
  const answeredIds = Object.keys(users[authedUser].answers)

  const answered = answeredIds.map(questionID => questions[questionID]);
  const unanswered = Object.keys(questions)
    .filter(questionId => !answeredIds.includes(questionId))
    .map(questionID => questions[questionID]);

  return {
    answered,
    unanswered
  }
};

export default connect(mapStateToProps)(Home);