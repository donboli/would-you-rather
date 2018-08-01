import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Image, Button } from 'semantic-ui-react';

class Question extends Component {
  render() {
    const { autherInfo, optionOne } = this.props;

    return (
      <Card>
        <Card.Content>
          <Image floated='right' size='mini' src={autherInfo.avatarURL} />
          <Card.Header>{autherInfo.name} asks</Card.Header>
          <Card.Meta>Would You Rather...</Card.Meta>
        </Card.Content>
        <Card.Content description>
          {optionOne.text}...
        </Card.Content>
        <Card.Content extra>
          <Button basic fluid color='blue'>
            View Poll
          </Button>
        </Card.Content>
      </Card>
    )
  }
}

const mapStateToProps = ({ questions, users }, { id }) => {
  const { author, optionOne } = questions[id];
  const autherInfo = users[author];

  return {
    autherInfo,
    optionOne
  }
};

export default connect(mapStateToProps)(Question);