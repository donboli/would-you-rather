import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu, Button } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';

import { setAuthedUser } from 'actions/authedUser';

class Navbar extends Component {
  authenticationItem = (location, authedUser, logout) => {
    let item;

    if (authedUser) {
      item = <Menu.Item
        name='logout'
        onClick={logout}
        as={Button}>
        Logout
      </Menu.Item>
    } else {
      item = <Menu.Item
        name='login'
        active={location.pathname === '/login'}
        as={Link}
        to='/login'>
        Login
      </Menu.Item>
    }

    return item;
  }

  render() {
    const { location, authedUser, logout } = this.props;

    return (
      <Menu>
        <Menu.Item
          name='home'
          active={location.pathname === '/'}
          as={Link}
          to='/'>
          Home
        </Menu.Item>

        <Menu.Item
          name='submit'
          active={location.pathname === '/add'}
          as={Link}
          to='/add'>
          Ask Question
        </Menu.Item>

        <Menu.Item
          name='submit'
          active={location.pathname === '/leaderboard'}
          as={Link}
          to='/leaderboard'>
          Leaderboard
        </Menu.Item>

        <Menu.Menu position='right'>
          {this.authenticationItem(location, authedUser, logout) }
        </Menu.Menu>
      </Menu>
    )
  }
}

const mapStateToProps = ({authedUser}) => {
  return {
    authedUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(setAuthedUser(null))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));