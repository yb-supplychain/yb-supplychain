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

handleChange = async (e, {value}) => {
  await this.setState({user: value})
  this.props.handleUser(this.state.user)
}


  render() {
    const {step, handleStep, handleUser, users, user} = this.props
    return (
      <Segment inverted textAlign='center'>
      <Form inverted className="form">

        <Form.Group>
        <Form.Select className="dropdown" value={user} name='user' control={Select} label='Devices' options={users} placeholder='Please select a device' onChange={this.handleChange}/>
        </Form.Group>
      <Form.Button onClick={() => handleStep(step)}>Create Order</Form.Button>
      </Form>
      </Segment>
  )}
}

export default CreateOrderFarm
