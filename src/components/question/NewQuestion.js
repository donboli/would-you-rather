import React, { Component } from 'react';
import { Card, Button, Form } from 'semantic-ui-react'
import { connect } from 'react-redux';

import { handleSaveQuestion } from '../../actions/shared';

export class NewQuestion extends Component {
  state = { optionOneText: '', optionTwoText: '' }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  }

  handleSubmit = () => {
    const { optionOneText, optionTwoText } = this.state;

    this.props.saveQuestion({
      optionOneText,
      optionTwoText
    })
  }

  render() {
    const { optionOneText, optionTwoText } = this.state

    return (
      <Card>
        <Card.Content header='Would you rather...' />
        <Card.Content>
          <Form onSubmit={this.handleSubmit}>
            <Form.Field>
              <Form.Input
                name='optionOneText'
                value={optionOneText}
                onChange={this.handleChange}
                placeholder='do this' />
            </Form.Field>
            or
            <Form.Field>
              <Form.Input
                name='optionTwoText'
                value={optionTwoText}
                onChange={this.handleChange}
                placeholder='do that' />
            </Form.Field>
            <Button type='submit'>Submit</Button>
          </Form>
        </Card.Content>
      </Card>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    saveQuestion: (question) => dispatch(handleSaveQuestion(question))
  }
}

export default connect(null, mapDispatchToProps)(NewQuestion)