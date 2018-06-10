import React, { Component } from 'react'
import { Form, Segment, Select, Input, Step, Button } from 'semantic-ui-react'

class CompletedShop extends Component {

  render() {
    const {step, handleStep} = this.props
    return (
      <Segment inverted textAlign='center'>
        <Form inverted className="form">
        <Form.Field className="statusField" >
          <label>Current Status</label>
            <Button positive>Your posting has been successfully posted!</Button>
        </Form.Field>
        <Form.Button onClick={() => handleStep(step)} >View Status</Form.Button>
        </Form>
      </Segment>
    )
  }
}

export default CompletedShop
