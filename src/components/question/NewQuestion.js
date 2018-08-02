import React, { Component } from 'react';
import { Card, Button, Form } from 'semantic-ui-react'

export class NewQuestion extends Component {
  render() {
    return (
      <Card>
        <Card.Content header='Would you rather...' />
        <Card.Content>
          <Form>
            <Form.Field>
              <input placeholder='do this' />
            </Form.Field>
            or
            <Form.Field>
              <input placeholder='do that' />
            </Form.Field>
            <Button type='submit'>Submit</Button>
          </Form>
        </Card.Content>
      </Card>
    );
  }
}