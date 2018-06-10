import React, { Component } from 'react'
import { Form, Segment, Select, Input, Step, Button } from 'semantic-ui-react'


const listOfDevices = [
  { key: 'o', text: 'N9TT-9G0A-B7FQ-RANC', value: 'N9TT-9G0A-B7FQ-RANC' },
  { key: 'g', text: 'QK6A-JI6S-7ETR-0A6C', value: 'QK6A-JI6S-7ETR-0A6C' },
  { key: 'p', text: 'SXFP-CHYK-ONI6-S89U', value: 'SXFP-CHYK-ONI6-S89U' },
  { key: 'm', text: 'NHLE-L6MI-4GE4-ETEV', value: 'NHLE-L6MI-4GE4-ETEV' }
]

class ConfirmationFarm extends Component {
  state = { order: {} }
    handleChange = (e, value) => {
      this.setState({devices: value })
    }
  async componentDidMount() {
    console.log(this.props);
    const response = await fetch(`/api/order/${this.props.order}`);
    const order = await response.json();
    this.setState({ order });
  }
  createField(label, value, index) {
    return(
      <Form.Field className="form-field" key={index}>
        <label>{label}</label>
        <Form.Input name={label} value={value} readOnly/>
      </Form.Field>
    );
  }
  render() {
    const {step, handleStep, user, devices} = this.props
    const { order } = this.state;
    console.log('order:', order);
    return (
      <Segment inverted textAlign='center'>
        <Form inverted className="form">
          {
            Object.keys(order).length && Object.keys(order).map((key, index) => this.createField(key, order[key], index))
          }
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
    );
  }
}

export default ConfirmationFarm
