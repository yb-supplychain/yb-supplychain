import React, { Component } from 'react'
import { Form, Segment } from 'semantic-ui-react'

class ConfirmationShop extends Component {

  render() {
    const {step, handleStep} = this.props
    return (
      <Segment inverted textAlign='center'>
        <Form inverted className="form">
          <Form.Group inline>
            <Form.Field className="quantityField" >
              <label>Public Key   </label>
              <Form.Input name='quantity' value="your public key" placeholder='Desired grams' onChange={this.handleChange} readOnly/>
            </Form.Field>
          </Form.Group>
        <Form.Button onClick={() => handleStep(step)} >Confirm Shipment</Form.Button>
        </Form>
      </Segment>
    )
  }


}

export default ConfirmationShop
