import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import LoadingBar from 'react-redux-loading-bar'

import { handleInitialData } from 'actions/shared';

import { Content } from './Content';
import Navbar from './Navbar';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    const { location, loggedIn } = this.props;

    if (!loggedIn && location.pathname !== '/login') {
      return <Redirect to="/login"/>;
    }

    return (
      <div>
        <LoadingBar />
        <Navbar/>
        <Content/>
      </div>
    );
  }
}

const mapStateToProps = ({ authedUser }) => {
  return {
    loggedIn: authedUser !== null
  };
}

export default withRouter(connect(mapStateToProps)(App));
