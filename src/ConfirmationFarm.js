import React, { Component } from 'react'
import { Form, Segment, Select, Input, Step, Button } from 'semantic-ui-react'

class ConfirmationFarm extends Component {

  render() {
    const {step, handleStep, user} = this.props
    return (
      <Segment inverted textAlign='center'>
        <Form inverted className="form">
          <Form.Group inline>
            <Form.Field className="timeOfHarvest" >
              <label>Time of Harvest</label>
              <Form.Input name='timeOfHarvest' value="4:20pm" placeholder='Time of Harvest' readOnly/>
            </Form.Field>
          </Form.Group>
          <div>
            <Button positive>Pesticide Free</Button>
            <Button positive>Organic</Button>
          </div>
          <Form.Group>
            <Form.Field className="publicKeyField" >
              <label>Public Key</label>
              <Form.Input name='quantity' value="your public key" placeholder='Desired grams' readOnly/>
            </Form.Field>
            <Form.Field className="statusField" >
              <label>Device ID</label>
              <Form.Input name='status' value={user} placeholder='Current status' readOnly/>
            </Form.Field>
          </Form.Group>
        <Form.Button onClick={() => handleStep(step)} >Confirm Shipment</Form.Button>
        </Form>
      </Segment>
    )
  }
}

export default ConfirmationFarm
