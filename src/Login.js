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
          <label> User </label>
          <Input placeholder='Enter username' onChange={this.handleChange} />
        </Form.Field>
        <Form.Button onClick={() => this.handleSubmit(this.state.user)}>Login</Form.Button>
        </div> }
        {submittedUser === 'shop' && <Order /> }
        {submittedUser === 'farm' && <OrderFarm /> }
      </div>
    )
  }


}

export default Login
