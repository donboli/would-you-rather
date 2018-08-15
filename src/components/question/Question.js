import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { Button, Card, Image, Progress, Segment, Label, Icon, Header } from 'semantic-ui-react';

import { handleAnswerQuestion } from 'actions/shared';

class Question extends Component {
  saveQuestionAnswer(answer) {
    if (!this.props.answer) {
      this.props.saveQuestionAnswer({
        qid: this.props.question.id,
        answer
      });
    }
  }

  totalVotes = (question) => {
    return question['optionOne'].votes.length + question['optionTwo'].votes.length;
  }

  votesInFavor = (question, answer) => {
    return question[answer].votes.length;
  }

  unansweredButton = (color, option, question) => (
    <Button
      basic
      color={color}
      onClick={this.saveQuestionAnswer.bind(this, option)}>
      {question[option].text}
    </Button>
  )

  unansweredContent = (question) => {
    return (
      <Card.Content>
        <div className='ui two buttons'>
          {this.unansweredButton('green', 'optionOne', question) }
          <Button.Or />
          {this.unansweredButton('red', 'optionTwo', question) }
        </div>
      </Card.Content>
    )
  }

  answeredSegment = (color, question, option, answer) => (
    <Segment
      padded='very'
      color={color}>
      {answer === option && <Label attached='top right' color={color}>Your vote</Label>}
      <Header size='medium'>{question[option].text}</Header>
      <Label attached='bottom left'>
        <Icon name='user circle' />{this.votesInFavor(question, option)}
      </Label>
      <Progress
        value={this.votesInFavor(question, option)}
        total={this.totalVotes(question)}
        color='teal'
        precision={0}
        progress='percent'>
        opted for this answer
      </Progress>
    </Segment>
  )

  answeredContent = (question, answer) => {
    return (
      <Fragment>
        <Card.Content>
          {this.answeredSegment('green', question, 'optionOne', answer)}
          {this.answeredSegment('red', question, 'optionTwo', answer)}
        </Card.Content>
      </Fragment>
    );
  }

  render () {
    const { authorInfo, question, answer } = this.props;

    if (!question) {
      return <Redirect to='/404'/>;
    }

    return (
      <Card>
        <Card.Content>
          <Image floated='right' size='mini' src={authorInfo.avatarURL} />
          <Card.Header>{authorInfo.name} asks</Card.Header>
          <Card.Meta>Would You Rather...</Card.Meta>
        </Card.Content>
        { answer ? this.answeredContent(question, answer) : this.unansweredContent(question) }
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