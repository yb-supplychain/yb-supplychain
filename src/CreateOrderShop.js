import React, { Component } from 'react'
import { Form, Segment, Select, Input, Step } from 'semantic-ui-react'

const gradeOptions = [
  { key: 'r', text: 'Regular', value: 'regular' },
  { key: 'p', text: 'Premium', value: 'premium' },
]

const strainOptions = [
  { key: 'o', text: 'OG Kush', value: 'og kush' },
  { key: 'g', text: 'Green Crack', value: 'green crack' },
  { key: 'p', text: 'Pineapple Express', value: 'pineapple express' },
  { key: 'm', text: 'Master Kush', value: 'master kush' }
]

class CreateOrderShop extends Component {
  state = { grade: '', strain: '', quantity: '' }

  handleChange = (e, {name, value}) => {
    this.setState({ [name]: value })
      console.log('this.state:', this.state);
  }

  handleSubmit = async () => {
    const response = await fetch('/api/order', {
      method: 'POST',
      body: JSON.stringify(this.state), // data can be `string` or {object}!
      headers:{
        'Content-Type': 'application/json'
      }
    });
    const id = await response.json();
    console.log('id:', id);
    this.props.handleStep(this.props.step);
  }

  render() {
    const {step, handleStep} = this.props
    return (
      <Segment inverted textAlign='center'>
      <Form inverted className="form">
        <Form.Group>
        <Form.Select className="dropdown" name='grade' control={Select} label='Grade' options={gradeOptions} placeholder='Please select your grade' onChange={this.handleChange}/>
        </Form.Group>

        <Form.Group>
        <Form.Select className="dropdown" name='strain' control={Select} label='Strain' options={strainOptions} placeholder='Please select your strain' onChange={this.handleChange}/>
        </Form.Group>

        <Form.Group inline>
      <Form.Field className="quantityField" >
        <label>Quantity</label>
        <Input name='quantity' placeholder='Desired grams' onChange={this.handleChange} />
      </Form.Field>
      </Form.Group>
      <Form.Button onClick={() => this.handleSubmit()}>Create Order</Form.Button>
      </Form>
      </Segment>
  )}
}

export default CreateOrderShop
