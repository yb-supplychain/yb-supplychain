import React, { Component } from 'react'
import { Form, Segment } from 'semantic-ui-react'

class ConfirmationShop extends Component {
  handleChange
  render() {
    const {step, handleStep} = this.props
    return (
      <Segment inverted textAlign='center'>
        <Form inverted className="form">
          <Form.Group inline>
            <Form.Field className="quantityField" >
              <label>Password</label>
              <Form.Input name='quantity' placeholder='your password' onChange={this.handleChange} type="password" />
            </Form.Field>
          </Form.Group>
        <Form.Button onClick={() => handleStep(step)} >Confirm Shipment</Form.Button>
        </Form>
      </Segment>
    )
  }


}

export default ConfirmationShop
