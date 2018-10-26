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
  handleChange = this.handleChange.bind(this)
  renderConsts = this.parseConst.bind(this)

  componentDidMount() {
      this.parseConst(this.state.value)
  }

  handleChange(i) {
      this.setState({value: i.target.value})
      try {
      this.parseConst(i.target.value)
    }catch (e) {

    }
  }

  getKey(c) {
      let beginning = c.indexOf("[")
      let ending = c.indexOf("]")
      return c.substring(beginning+1, ending)
  }
  getValue(c) {
      let beginning = c.indexOf(":")
      return c.substring(beginning+1)
  }
  getJSONFromString(string, array) {
      string = string.replace(/\n/g,'')
      string = string.replace(/ /g,'')
      let constantsArray = string.substring(22,66).split(",")
      constantsArray.pop()




    let constantsJson = {}
      constantsArray.forEach(c => {
          let key = this.getKey(c)
          let value = this.getValue(c)
          constantsJson[key] = value
      })
      return constantsJson

  }
  parseConst(c) {
      const mapTitle = c.substring(6,21)
      console.log("trying to iterate");
      let json = this.getJSONFromString(c)

      let constString = ""
      let constsObject = "const consts = { \n"
      constsObject += mapTitle + ", \n"

      for(let k in json) {
          constString += "const " + k + " = " + "\"" + k + "\"" + "\n"
          constsObject += k + ",\n"
      }
      constsObject += "}"
     const moduleExports = "module.exports = consts"
  }

  render() {
      return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
          <Input className="MainInputArea" type="textarea" name="text" id="exampleText"
          value= {this.state.value} onChange={this.handleChange}
          />
      </div>
    );
  }
}

export default App;
