import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Card, Image, Button } from 'semantic-ui-react';

import { handleAnswerQuestion } from '../../actions/users';

class Question extends Component {
  saveQuestionAnswer(answer) {
    this.props.saveQuestionAnswer({
      qid: this.props.question.id,
      answer
    }, () => {
      this.props.history.push(`/`);
    });
  }

  render () {
    const { authorInfo, question } = this.props;

    if (question) {
      // TODO: Redirect to 404
    }

    return (
      <Card>
        <Card.Content>
          <Image floated='right' size='mini' src={authorInfo.avatarURL} />
          <Card.Header>Would You Rather...</Card.Header>
          <Card.Meta>{ authorInfo.name }</Card.Meta>
        </Card.Content>
        <Card.Content extra>
          <div className='ui two buttons'>
            <Button
              basic
              color='green'
              onClick={this.saveQuestionAnswer.bind(this, 'optionOne')}>
              {question.optionOne.text}
            </Button>
            <Button
              basic
              color='red'
              onClick={this.saveQuestionAnswer.bind(this, 'optionTwo')}>
              {question.optionTwo.text}
          </Button>
          </div>
        </Card.Content>
      </Card>
    )
  }
}

const mapStateToProps = ({ questions, users }, ownProps) => {
  const question = questions[ownProps.match.params.question_id];
  const authorInfo = question ? users[question.author] : null

  return {
    question,
    authorInfo
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveQuestionAnswer: (answer, cb) => dispatch(handleAnswerQuestion(answer, cb))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Question));