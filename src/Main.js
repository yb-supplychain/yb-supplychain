import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
  Item
} from 'semantic-ui-react'
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch,
  Redirect
} from 'react-router-dom'
import Background from './background.jpg'
import SanFran from './sanfran.jpg'

var sectionStyle = {
  height: '100%',
  width: '100%',
  backgroundImage: `url(${Background})`
}

const description = [
  'Cute dogs come in a variety of shapes and sizes. Some cute dogs are cute for their adorable faces, others for their',
  'tiny stature, and even others for their massive size.',
].join(' ')

class Main extends Component {
  state = {}

  render () {
    return (
      <Container text>
        <Header
          as='h1'
          content='YB SUPPLY CHAIN'
          inverted
          style={{
            fontSize: '4em',
            fontWeight: 'normal',
            marginBottom: 0,
            marginTop: '3em',
          }}
        />
        <Header
          as='h2'
          content='Logistics for the Modern World'
          inverted
          style={{
            fontSize: '1.7em',
            fontWeight: 'normal',
            marginTop: '1.5em',
          }}
        />
      </Container>
    )
  }
}

export default Main
