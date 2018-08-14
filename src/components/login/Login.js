import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Dropdown, Card } from 'semantic-ui-react';

import { setAuthedUser } from 'actions/authedUser';

export class Login extends Component {
  handleChange = (e, data) => {
    this.props.login(data.value);
    this.props.history.push(`/`);
  }

  usersToDropdown = (userList) => {
    return userList.map(user => ({
      text: user.name,
      value: user.id,
      image: {
        avatar: true,
        src: user.avatarURL
      }
    }));
  }

  render() {
    const { userList } = this.props;

    return (
      <Card>
        <Card.Content>
          <Card.Header>Login</Card.Header>
          <Card.Meta>Would You Rather...</Card.Meta>
        </Card.Content>
        <Card.Content>
          <Dropdown
            placeholder='Select User'
            fluid
            selection
            onChange={this.handleChange}
            options={this.usersToDropdown(userList)} />
        </Card.Content>
      </Card>
    )
  }
}

const mapStateToProps = ({ users }) => {
  const userList = Object.keys(users).map(id => users[id])

  return {
    userList
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (id) => {
      dispatch(setAuthedUser(id));
      localStorage.setItem('authedUser', id);
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));