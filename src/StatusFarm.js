import React, { Component } from 'react'
import { Form, Segment, Select, Input, Step, Button } from 'semantic-ui-react'

class StatusFarm extends Component {

  render() {
    const {step, handleStep} = this.props
    return (
      <Segment inverted textAlign='center'>
        <Form inverted className="form">
        <Form.Field className="statusField" >
          <label>Current Status</label>
            <Button positive>You have accepted the request.</Button>
        </Form.Field>
        </Form>
      </Segment>
    )
  }
}

export default StatusFarm
