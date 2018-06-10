import React, { Component } from 'react'
import { Form, Segment, Select, Input, Step, Button } from 'semantic-ui-react'


const listOfDevices = [
  { key: 'o', text: 'N9TT-9G0A-B7FQ-RANC', value: 'N9TT-9G0A-B7FQ-RANC' },
  { key: 'g', text: 'QK6A-JI6S-7ETR-0A6C', value: 'QK6A-JI6S-7ETR-0A6C' },
  { key: 'p', text: 'SXFP-CHYK-ONI6-S89U', value: 'SXFP-CHYK-ONI6-S89U' },
  { key: 'm', text: 'NHLE-L6MI-4GE4-ETEV', value: 'NHLE-L6MI-4GE4-ETEV' }
]

class ConfirmationFarm extends Component {

    handleChange = (e, value) => {
      this.setState({devices: value})
    }

  render() {
    const {step, handleStep, user, devices} = this.props
    return (
      <Segment inverted textAlign='center'>
        <Form inverted className="form">
          <Form.Group inline>
            <Form.Field className="timeOfHarvest" >
              <label>Time of Harvest</label>
              <Form.Input name='timeOfHarvest' value="4:20pm" placeholder='Time of Harvest' readOnly/>
            </Form.Field>
          </Form.Group>
          <Form.Group>
          <Form.Select className="dropdown" value={devices} name='user' control={Select} label='Devices' options={listOfDevices} placeholder='Please select a device' onChange={this.handleChange}/>
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
              <label>Requester</label>
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
