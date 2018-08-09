import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, Image, Table } from 'semantic-ui-react';

export class Leaderboard extends Component {
  totalAnswers(users) {
    return users.map(user => user.answers.length)
                .reduce((acc, value) => acc + value, 0)
  }

  totalQuestions(users) {
    return users.map(user => user.questions.length)
                .reduce((acc, value) => acc + value, 0)
  }

  render() {
    const { users } = this.props;

    return (
      <Table stackable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>User</Table.HeaderCell>
            <Table.HeaderCell># of Questions</Table.HeaderCell>
            <Table.HeaderCell># of Answers</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          { users.map((user, index) => (
            <Table.Row
              active={index === 0}
              key={user.id}>
              <Table.Cell>
                <Header as='h4' image>
                  <Image src={user.avatarURL} rounded size='mini' />
                  <Header.Content>{user.name}</Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>{user.questions.length}</Table.Cell>
              <Table.Cell>{user.answers.length}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell>{users.length} People</Table.HeaderCell>
            <Table.HeaderCell>{this.totalQuestions(users)}</Table.HeaderCell>
            <Table.HeaderCell>{this.totalAnswers(users)}</Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    )
  }
}


const mapStateToProps = ({ users }) => {
  const userList = Object.keys(users).map(id => ({
    ...users[id],
    answers: Object.keys(users[id].answers).map(key => users[id].answers[key])
  }));
  const sortedUserList = userList.sort((a, b) => {
    return (b.answers.length + b.questions.length) - (a.answers.length + a.questions.length)
  });

  return {
    users: sortedUserList
  }
}

export default connect(mapStateToProps)(Leaderboard);