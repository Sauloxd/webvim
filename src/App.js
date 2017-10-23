import React, { Component } from 'react'
import Line from './components/line'

import './App.css'

const MODES = {
  INSERT_MODE: 'insert_mode',
  NORMAL_MODE: 'normal_mode'
}

const KEY_CODES = {
  'h': 72,
  'j': 74,
  'k': 75,
  'l': 76
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: 'DummyText',
      charPosition: { x: 1, y: 0 },
      mode: MODES.NORMAL_MODE
    }
    document.body.onkeydown = this.handleMovement.bind(this)
  }

  handleMovement(ev) {
    const mapActions = {
      [MODES.NORMAL_MODE]: {
        [KEY_CODES['l']]: () =>
          !this.state.text[this.state.charPosition.x + 1]
            ? this.setState({ charPosition: { ...this.state.charPosition, x: this.state.text.length - 1 }})
            : this.setState({ charPosition: { ...this.state.charPosition, x: this.state.charPosition.x + 1 }}),
        [KEY_CODES['h']]: () =>
          !this.state.text[this.state.charPosition.x - 1]
            ? this.setState({ charPosition: { ...this.state.charPosition, x: 0 }})
            : this.setState({ charPosition: { ...this.state.charPosition, x: this.state.charPosition.x - 1 }})
      }
    }
    return mapActions[this.state.mode][ev.keyCode] && mapActions[this.state.mode][ev.keyCode]()
  }

  render() {
    return (
      <div className="App">
        <Line text={this.state.text} isActive={true} onChar={this.state.charPosition.x}/>
      </div>
    );
  }
}

export default App;
