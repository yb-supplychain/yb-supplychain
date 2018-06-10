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

class CreateOrderFarm extends Component {
  state = {orders: [], order: ''}
  async componentDidMount() {
    const response = await fetch('/api/orders');
    const ids = await response.json();
    const orders = ids.map(id => ({ key: id, text: id, value: id }));
    this.setState({ orders });
  }
  handleChange = async (e, {value}) => {
    await this.setState({order: value})
    this.props.handleUser(this.state.order)
  }

  render() {
    const {step, handleStep, handleUser, users, user} = this.props
    const { order } = this.state;
    return (
      <Segment inverted textAlign='center'>
      <Form inverted className="form">

        <Form.Group>
        <Form.Select className="dropdown" value={user} name='user' control={Select} label='Requests' options={this.state.orders} placeholder='Please select a request' onChange={this.handleChange}/>
        </Form.Group>
      <Form.Button onClick={() => handleStep(step, order)}>View Request</Form.Button>
      </Form>
      </Segment>
  )}
}

export default CreateOrderFarm
