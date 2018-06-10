import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Form, Segment, Select, Input, Step } from 'semantic-ui-react'
import StepComponent from './StepComponent'
import CreateOrderFarm from './CreateOrderFarm'
import ConfirmationShop from './ConfirmationShop'
import ConfirmationFarm from './ConfirmationFarm'
import StatusFarm from './StatusFarm'

class OrderFarm extends Component {
  state = {grade: '', strain: '' , quantity: '', step: 'createOrder', users: [], user: ''}

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value })
    console.log(this.state.grade)
    console.log(this.state.quantity)
  }

  handleUser = (field) => {
    this.setState({user: field})
    console.log(this.state.user)
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(json =>  {
        for(var key in json) {
          this.state.users.push({text: json[key].name, value: json[key].name})
        }
    })
    console.log(this.state.users)
  }

  handleStep = (field) => {
    console.log("in here")
    if(field === 'createOrder') {
      this.setState({step: 'confirmation'})
    } else if (field === 'confirmation') {
      this.setState({step: 'status'})
    } else if (field === 'status') {
      this.setState({step: 'summary'})
    } else if (field === 'summary') {
      this.setState({step: 'summary'})
    }
  }

  render() {
    const { value, quantity, step, users, user } = this.state
    return (
      <div>
        <StepComponent step={this.state.step} />

        {step === 'createOrder' &&
          <CreateOrderFarm step={step}  handleStep={this.handleStep} handleUser={this.handleUser} users={users} user={user}/>
        }

        {step === 'confirmation' &&
          <ConfirmationFarm step={step} user={user} handleStep={this.handleStep}/>
        }

        {step === 'status' &&
          <StatusFarm step={step} handleStep={this.handleStep} />
        }

      </div>
    )
  }
}

export default OrderFarm;
