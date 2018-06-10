import React, { Component } from 'react'
import { Form, Segment, Select, Input, Step, Button } from 'semantic-ui-react'

const soilOptions = [
  { key: 'w', text: 'Water', value: 'water' },
  { key: 'o', text: 'Oxygen', value: 'oxygen' },
  { key: 'n', text: 'Nitrogen', value: 'nitrogen' },
  { key: 'p', text: 'Phosphorus', value: 'phosphorus' }
]

class ConfirmationFarm extends Component {

  render() {
    const {step, handleStep} = this.props
    return (
      <Segment inverted textAlign='center'>
        <Form inverted className="form">
          <Form.Group>
          <Form.Select className="dropdown" name='soilContent' control={Select} label='Soil' options={soilOptions} placeholder='Soil content' onChange={this.handleChange}/>
          </Form.Group>

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
              <label>Current Status</label>
              <Form.Input name='status' value="Picked up by carrier" placeholder='Current status' readOnly/>
            </Form.Field>
          </Form.Group>
        <Form.Button onClick={() => handleStep(step)} >Confirm Shipment</Form.Button>
        </Form>
      </Segment>
    )
  }
}

export default ConfirmationFarm
