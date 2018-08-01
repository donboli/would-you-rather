import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '../home/Home';
import { NewQuestion, Question } from '../question';
import { Leaderboard } from '../leaderboard/Leaderboard';
import { Login } from '../login/Login';

export class Content extends Component {
  render () {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/add" component={NewQuestion} />
        <Route exact path="/leaderboard" component={Leaderboard} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/questions/:question_id" component={Question} />
      </Switch>
    )
  }
}