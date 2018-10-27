import React, { Component } from 'react';
import { Input } from "reactstrap"
import logo from './logo.png';
import './App.css';

class App extends Component {
  state = {
      constString : "",
      constsObject : "",
      moduleExports : "",
    InputValue : `const abc = {
                [ENGLISH]: 2057,
                [GERMAN]: 1031,
            }

`,

  }

  handleChange = this.handleChange.bind(this)
  renderConsts = this.parseConst.bind(this)

  componentDidMount() {
      try {
          const elements = this.parseConst(this.state.InputValue)
          this.setState({
              constString: elements.constString,
              constsObject: elements.constsObject,
              moduleExports: elements.moduleExports
          })
      }catch (e) {
          console.error("compinentDidMount Error");
      }
  }

  handleChange(i) {
      try {
          const elements = this.parseConst(i.target.value)
          this.setState({
              InputValue: i.target.InputValue,
              constString: elements.constString,
              constsObject: elements.constsObject,
              moduleExports: elements.moduleExports
          })

    }catch (e) {
          console.error("changeError");
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
      let constantsArray = string.substring(string.indexOf("{")+1,string.indexOf("}")-2).split(",")
      let constantsJson = {}
      constantsArray.forEach(c => {
          let key = this.getKey(c)
          let value = this.getValue(c)
          constantsJson[key] = value
      })
      return constantsJson

  }
  parseConst(c) {
      try {
          const mapTitle = c.substring(6, c.indexOf("=")-1)
          let json = this.getJSONFromString(c)

          // const ENGLISH = "ENGLISH"
          let constString = ""

          // const consts = { G8_LANGUAGE_MAP,
          let constsObject = "const consts = { \n"
          constsObject += mapTitle + ", \n"

          for (let k in json) {
              constString += "const " + k + " = " + "\"" + k +  "\" \n"
              constsObject += k + ",\n"
          }
          constsObject += "}"
          const moduleExports = "module.exports = consts"

          return {
              constString,
              constsObject,
              moduleExports
          }
      }catch(err)
      {
        return " rurn null;et"
      }

  }

  render() {
      const outputElements = this.parseConst(this.state.InputValue)
      return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p className="AppTitle">constans creator</p>
        </header>
          <div className="MainInputArea">
              <Input className="InputField" type="textarea" name="text" id="exampleText"
                     value= {this.state.InputValue} onChange={this.handleChange}
              />
              <Input className="outputElements" type="textarea" onChange={null}
                     value={this.state.constString + "\n" +
                         this.state.constsObject + "\n" +
                         this.state.moduleExports + "\n"
                     }>

              </Input>
          </div>
      </div>
    );
  }
}

export default App;
