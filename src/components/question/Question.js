import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Image, Button } from 'semantic-ui-react';

class Question extends Component {
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
            <Button basic color='green'>
              {question.optionOne.text}
            </Button>
            <Button basic color='red'>
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

export default connect(mapStateToProps)(Question);