import React, { Component } from 'react';
import { Segment, Icon, Grid } from 'semantic-ui-react';

export const NotFound = () => {
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <Segment class="grid centered" textAlign='center'>
            <Icon name="frown" size="massive"/>
            Sorry, we couldn't find the page you're looking for.
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}