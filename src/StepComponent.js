import React, { Component } from 'react'
import { Step } from 'semantic-ui-react'


class StepComponent extends Component {

  render() {
    const { step } = this.props
    return (
  <Step.Group ordered>
    <Step active={step === 'createOrder'} completed={step !== 'createOrder' || step === 'statusAgain'}>
      <Step.Content>
        <Step.Title>Order Creation</Step.Title>
        <Step.Description>Create your order</Step.Description>
      </Step.Content>
    </Step>

    <Step active={step === 'confirmation'} completed={step === 'status' || step === 'summary'  || step === 'statusAgain'}>
      <Step.Content>
        <Step.Title>Confirmation</Step.Title>
        <Step.Description>View order information</Step.Description>
      </Step.Content>
    </Step>

    <Step active={step === 'status'} completed={step === 'summary'  || step === 'statusAgain'}>
      <Step.Content>
        <Step.Title>Status </Step.Title>
        <Step.Description>View current status</Step.Description>
      </Step.Content>
    </Step>

    <Step active={step === 'summary'} completed={step === 'summary'  || step === 'statusAgain'}>
      <Step.Content>
        <Step.Title>Summary </Step.Title>
        <Step.Description> Final summary of your order</Step.Description>
      </Step.Content>
    </Step>
  </Step.Group>
  )}
}

export default StepComponent
