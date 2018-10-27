import React, { Component } from 'react';
import { Input } from "reactstrap"
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
      constString : "",
      constsObject : "",
      moduleExports : "",
    InputValue : `const G8_LANGUAGE_MAP = {
                [ENGLISH]: 2057,
                [GERMAN]: 1031,
                [ARABIC]: 10241,
                [DEUTSCH]: 1111,
                [FRANCOUIS]: 1111,
                [BOBBY]: 1111,
            }
`,

  }

  handleChange = this.handleChange.bind(this)
  renderConsts = this.parseConst.bind(this)

  componentDidMount() {
      try {
          this.parseConst(this.state.InputValue)
      }catch (e) {
          console.log("compinentDidMount Error");
      }
  }

  handleChange(i) {
      this.setState({InputValue: i.target.InputValue})
      try {
      this.parseConst(i.target.InputValue)
    }catch (e) {
          console.log("handleChangeError");
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
      console.log(constantsArray);

      let constantsJson = {}
      constantsArray.forEach(c => {
          let key = this.getKey(c)
          let value = this.getValue(c)
          constantsJson[key] = value
      })
      console.log(constantsJson);
      return constantsJson

  }
  parseConst(c) {
      try {
          console.log("parsing");
          const mapTitle = c.substring(6, 21)
          console.log("trying to iterate");
          let json = this.getJSONFromString(c)

          let constString = ""
          let constsObject = "const consts = { \n "
          constsObject += mapTitle + ", \n"

          for (let k in json) {
              constString += "const " + k + " = " + "\"" + k + "\ \n"
              constsObject += k + ",\n"
          }
          constsObject += "}"
          const moduleExports = "module.exports = consts"




          this.state.constString = constString
          this.state.constsObject = constsObject
          this.state.moduleExports = moduleExports
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
