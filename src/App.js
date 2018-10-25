import React, { Component } from 'react';
import { Input } from "reactstrap"
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    value : `const G8_LANGUAGE_MAP = {
              [ENGLISH]: 2057,
              [GERMAN]: 1031,
              [ARABIC]: 10241,
          }`
  }


  render() {
      return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
          <Input className="MainInputArea" type="textarea" name="text" id="exampleText"
          value= {this.state.value}
          />
      </div>
    );
  }
}

export default App;
