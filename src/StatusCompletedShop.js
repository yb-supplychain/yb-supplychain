import React, { Component } from 'react'
import { Form, Segment, Select, Input, Step, Button } from 'semantic-ui-react'

class StatusCompletedShop extends Component {

  render() {
    const {step, handleStep} = this.props
    return (
      <Segment inverted textAlign='center'>
        <Form inverted className="form">
        <Form.Field className="statusField" >
          <label>Current Status</label>
            <Button positive>Your request has been accepted by a provider!</Button>
        </Form.Field>
        <Form.Button onClick={() => handleStep(step)} >Confirm Shipment</Form.Button>
        </Form>
      </Segment>
    )
  }
}

export default StatusCompletedShop
