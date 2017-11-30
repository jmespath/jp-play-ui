import React, { Component } from 'react';
import './App.css';
import logo from './logo.png';
import { Nav, NavItem, Navbar } from 'react-bootstrap';
import JMESPathPlayground from './components/JMESPathPlayground.js';
import 'whatwg-fetch';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar inverse className="App-navbar">
          <Navbar.Header>
            <Navbar.Brand>
              <img src={logo} height="23" alt="logo" />
            </Navbar.Brand>
            <Navbar.Brand>
              <a href="/">Playground</a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <NavItem href="http://jmespath.org/tutorial.html">Tutorial</NavItem>
            <NavItem href="http://jmespath.org/specification.html">Specification</NavItem>
            <NavItem href="http://jmespath.org/">JMESPath Site</NavItem>
          </Nav>
        </Navbar>
        <JMESPathPlayground />
      </div>
    );
  }
}

export default App;
