import PropTypes from 'prop-types'
import React, { Component } from 'react'
import './Order.css'
import { Form, Segment, Select, Input, Step } from 'semantic-ui-react'
import StepComponent from './StepComponent'
import CreateOrderShop from './CreateOrderShop'
import ConfirmationShop from './ConfirmationShop'
import StatusShop from './StatusShop'
import CompletedShop from './CompletedShop'
import StatusCompletedShop from './StatusCompletedShop'

class Order extends Component {
  state = {grade: '', strain: '' , quantity: '', step: 'createOrder'}

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value })
    console.log(this.state.grade)
    console.log(this.state.quantity)
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
      this.setState({step: 'statusAgain'})
    }
  }

  render() {
    const { value, quantity, step } = this.state
    return (
      <div>
        <StepComponent step={this.state.step} />

        {step === 'createOrder' &&
          <CreateOrderShop step={step} handleStep={this.handleStep} />
        }

        {step === 'confirmation' &&
          <ConfirmationShop step={step} handleStep={this.handleStep} />
        }

        {step === 'status' &&
          <StatusShop step={step} handleStep={this.handleStep} />
        }

        {step === 'summary' &&
        <CompletedShop step={step} handleStep={this.handleStep} />
        }

        {step === 'statusAgain' &&
          <StatusCompletedShop step={step} handleStep={this.handleStep} />
        }

      </div>
    )
  }
}

export default Order;
