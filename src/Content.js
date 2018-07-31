import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './Home';
import { NewQuestion } from './NewQuestion';
import { Leaderboard } from './Leaderboard';
import { Login } from './Login';

export class Content extends Component {
  render () {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/add" component={NewQuestion} />
        <Route exact path="/leaderboard" component={Leaderboard} />
        <Route exact path="/login" component={Login} />
      </Switch>
    )
  }
}