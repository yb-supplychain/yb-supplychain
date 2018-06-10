import React, { Component } from 'react'
import { Form, Segment, Select, Input, Step, Button } from 'semantic-ui-react'

class StatusShop extends Component {

  render() {
    const {step, handleStep} = this.props
    return (
      <Segment inverted textAlign='center'>
        <Form inverted className="form">
        <Form.Field className="statusField" >
          <label>Current Status</label>
            <Button color='yellow'>Awaiting provider</Button>
        </Form.Field>
        <Form.Button onClick={() => handleStep(step)} >Confirm Shipment</Form.Button>
        </Form>
      </Segment>
    )
  }
}

export default StatusShop
