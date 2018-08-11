import React from 'react';
import { Grid, Icon, Segment } from 'semantic-ui-react';

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