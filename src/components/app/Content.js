import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';

import Home from '../home/Home';
import { NewQuestion, Question } from '../question';
import Leaderboard from '../leaderboard/Leaderboard';
import { NotFound } from '../errors/NotFound';
import Login from '../login/Login';
import './Content.css';

export class Content extends Component {
  render () {
    const { loading } = this.props;

    return (
      <div className='container'>
        <Grid
          verticalAlign='middle'
          centered>
          { loading ? <Login /> : (
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/add" component={NewQuestion} />
              <Route exact path="/leaderboard" component={Leaderboard} />
              <Route exact path="/questions/:question_id" component={Question} />
              <Route exact path="/404" component={NotFound} />
            </Switch>
          )}
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = ({ authedUser }) => {
  return {
    loading: authedUser === null
  };
}

export default withRouter(connect(mapStateToProps)(Content));
