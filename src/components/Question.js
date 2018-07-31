import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Image, Button } from 'semantic-ui-react';

class Question extends Component {
  render () {
    const { autherInfo, optionOne, optionTwo } = this.props;

    return (
      <Card>
        <Card.Content>
          <Image floated='right' size='mini' src={autherInfo.avatarURL} />
          <Card.Header>Would You Rather...</Card.Header>
          <Card.Meta>{ autherInfo.name }</Card.Meta>
        </Card.Content>
        <Card.Content extra>
          <div className='ui two buttons'>
            <Button basic color='green'>
              {optionOne.text}
            </Button>
            <Button basic color='red'>
              {optionTwo.text}
          </Button>
          </div>
        </Card.Content>
      </Card>
    )
  }
}

const mapStateToProps = ({ questions, users }, { id }) => {
  const { author, optionOne, optionTwo } = questions[id];
  const autherInfo = users[author];

  return {
    autherInfo,
    optionOne,
    optionTwo
  }
};

export default connect(mapStateToProps)(Question);