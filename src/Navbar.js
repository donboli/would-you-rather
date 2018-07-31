import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';

class Navbar extends Component {
  render() {
    const { location } = this.props

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
          <Menu.Item
            name='login'
            active={location.pathname === '/login'}
            as={Link}
            to='/login'>
            Login
                    </Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  }
}

export default withRouter(Navbar);