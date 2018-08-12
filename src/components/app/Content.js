import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';

import Home from '../home/Home';
import { NewQuestion, Question } from '../question';
import Leaderboard from '../leaderboard/Leaderboard';
import Login from '../login/Login';
import { NotFound } from '../errors/NotFound';
import './Content.css';

export class Content extends Component {
  render () {
    return (
      <div className='container'>
        <Switch>
          <Grid
            verticalAlign='middle'
            centered>
            <Route exact path="/" component={Home} />
            <Route exact path="/add" component={NewQuestion} />
            <Route exact path="/leaderboard" component={Leaderboard} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/questions/:question_id" component={Question} />
            <Route exact path="/404" component={NotFound} />
          </Grid>
        </Switch>
      </div>
    )
  }
}