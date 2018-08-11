import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { Button, Card, Image, Progress } from 'semantic-ui-react';

import { handleAnswerQuestion } from '../../actions/shared';

class Question extends Component {
  saveQuestionAnswer(answer) {
    if (!this.props.answer) {
      this.props.saveQuestionAnswer({
        qid: this.props.question.id,
        answer
      });
    }
  }

  render () {
    const { authorInfo, question, answer } = this.props;

    if (!question) {
      return <Redirect to='/404'/>
    }

    return (
      <Card>
        <Card.Content>
          <Image floated='right' size='mini' src={authorInfo.avatarURL} />
          <Card.Header>Would You Rather...</Card.Header>
          <Card.Meta>{ authorInfo.name }</Card.Meta>
        </Card.Content>
        <Card.Content>
          { answer ? (
            <div className='ui two buttons'>
              <Button
                basic={!(answer === 'optionOne')}
                disabled={!(answer === 'optionOne')}
                color='green'
                onClick={this.saveQuestionAnswer.bind(this, 'optionOne')}>
                {question.optionOne.text}
              </Button>
              <Button.Or />
              <Button
                basic={!(answer === 'optionTwo')}
                disabled={!(answer === 'optionTwo')}
                color='red'
                onClick={this.saveQuestionAnswer.bind(this, 'optionTwo')}>
                {question.optionTwo.text}
              </Button>
            </div>
          ) : (
              <div className='ui two buttons'>
                <Button
                  basic
                  color='green'
                  onClick={this.saveQuestionAnswer.bind(this, 'optionOne')}>
                  {question.optionOne.text}
                </Button>
                <Button.Or />
                <Button
                  basic
                  color='red'
                  onClick={this.saveQuestionAnswer.bind(this, 'optionTwo')}>
                  {question.optionTwo.text}
                </Button>
              </div>
          ) }
        </Card.Content>
        { answer && (
          <Card.Content extra>
            <Progress
              value={question[answer].votes.length}
              total={question['optionOne'].votes.length + question['optionTwo'].votes.length}
              color='teal'
              progress='percent'>
              opted for this answer
            </Progress>
          </Card.Content>
        )}
      </Card>
    )
  }
}

const mapStateToProps = ({ questions, users, authedUser }, ownProps) => {
  const question = questions[ownProps.match.params.question_id];
  const authorInfo = question ? users[question.author] : null;
  const authedUserInfo = authedUser ? users[authedUser] : null;
  let answer = false;

  if (authedUserInfo && question) {
    answer = authedUserInfo.answers[question.id];
  }

  return {
    question,
    authorInfo,
    answer
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveQuestionAnswer: (answer, cb) => dispatch(handleAnswerQuestion(answer, cb))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Question));