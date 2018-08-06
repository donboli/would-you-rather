import React, { Component } from 'react';
import { Card, Button, Form, Message } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { handleSaveQuestion } from 'actions/shared';

export class NewQuestion extends Component {
  state = {
    optionOneText: '',
    optionTwoText: '',
    errors: {}
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value }, () => this.validateField(name));
  }

  validateField = (name) => {
    this.setState({
      errors: {
        [name]: this.state[name].length < 1
      }
    });
  }

  validateForm = (cb) => {
    this.setState({
      errors: {
        optionOneText: this.state.optionOneText.length < 1,
        optionTwoText: this.state.optionTwoText.length < 1
      }
    }, cb);
  }

  handleSubmit = () => {
    this.validateForm(() => {
      const { optionOneText, optionTwoText, errors } = this.state;

      if (!(errors.optionOneText || errors.optionTwoText)) {
        this.props.saveQuestion({
          optionOneText: optionOneText,
          optionTwoText: optionTwoText
        }, () => {
          this.props.history.push(`/`);
        });
      }
    });
  }

  render() {
    const { optionOneText, optionTwoText, errors } = this.state

    return (
      <Card>
        <Card.Content header='Would you rather...' />
        <Card.Content>
          <Form
            error={errors.optionOneText || errors.optionTwoText}
            onSubmit={this.handleSubmit}>
            <Message
              error
              header='Error'
              content='Both fields must be filled'
            />
            <Form.Field>
              <Form.Input
                error={errors.optionOneText}
                name='optionOneText'
                value={optionOneText.value}
                onChange={this.handleChange}
                placeholder='do this' />
            </Form.Field>
            or
            <Form.Field>
              <Form.Input
                error={errors.optionTwoText}
                name='optionTwoText'
                value={optionTwoText.value}
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
    saveQuestion: (question, cb) => dispatch(handleSaveQuestion(question, cb))
  }
}

export default withRouter(connect(null, mapDispatchToProps)(NewQuestion))