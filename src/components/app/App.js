import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading-bar'
import { withRouter } from 'react-router-dom';

import { handleInitialData } from 'actions/shared';

import Content from './Content';
import Navbar from './Navbar';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    return (
      <div>
        <LoadingBar/>
        <Navbar/>
        <Content/>
      </div>
    );
  }
}

export default withRouter(connect()(App));
