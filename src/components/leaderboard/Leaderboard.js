import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

export class Leaderboard extends Component {
  render() {
    const { users } = this.props;
    debugger;
    return users.map(user => (
      <div className="user" key={user.id}>
        <div>{user.name}</div>
        <div>Answers: {user.answers.length}</div>
        <div>Questions: {user.questions.length}</div>
      </div>
    ));
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