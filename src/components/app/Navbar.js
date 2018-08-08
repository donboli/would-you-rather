import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Menu, Button } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';

import { setAuthedUser } from 'actions/authedUser';

class Navbar extends Component {
  authenticationSection = (location, authedUserData, logout) => {
    let section;

    if (authedUserData) {
      section = (
        <Fragment>
          <Menu.Item>
            {authedUserData.name}
            &nbsp;
            <img src={authedUserData.avatarURL}/>
          </Menu.Item>
          <Menu.Item
            name='logout'
            onClick={logout}
            as={Button}>
            Logout
          </Menu.Item>
        </Fragment>
      )
    } else {
      section = <Menu.Item
        name='login'
        active={location.pathname === '/login'}
        as={Link}
        to='/login'>
        Login
      </Menu.Item>
    }

    return section;
  }

  render() {
    const { location, authedUserData, logout } = this.props;

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
          {this.authenticationSection(location, authedUserData, logout) }
        </Menu.Menu>
      </Menu>
    )
  }
}

const mapStateToProps = ({authedUser, users}) => {
  const authedUserData = users ? users[authedUser] : null

  return {
    authedUserData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(setAuthedUser(null))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));