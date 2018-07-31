import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

import { handleInitialData } from './actions/shared';
import './App.css';

import { Content } from './Content';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    const { location } = this.props

    return (
        <div>
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

          <Content/>
        </div>
    );
  }
}

export default withRouter(connect()(App));
