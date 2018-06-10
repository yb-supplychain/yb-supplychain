import React, { Component } from 'react'
import Order from './Order'
import OrderFarm from './OrderFarm'
import { Form, Segment, Select, Input, Step } from 'semantic-ui-react'

class Login extends Component {
  state = {user: '', submittedUser: ''}

  handleChange = (e, { value }) => {
    this.setState({ user: value})
    console.log(this.state.user)
  }

  handleSubmit = (field) => {
    this.setState({submittedUser: field})
  }

  render() {
    const { submittedUser } = this.state
    return (
      <div>
        {!submittedUser && <div>
        <Form.Field className="quantityField" >
          <label> Username </label>
          <Input placeholder='Enter username' onChange={this.handleChange} />
        </Form.Field>
        <Form.Field className="quantityField" >
          <label> Password </label>
          <Input type="password" placeholder='Enter password'/>
        </Form.Field>
        <Form.Button onClick={() => this.handleSubmit(this.state.user)}>Login</Form.Button>
        </div> }
        {submittedUser === 'dispensary' && <Order /> }
        {submittedUser === 'producer' && <OrderFarm /> }
      </div>
    )
  }


}

export default Login
