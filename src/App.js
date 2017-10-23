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
  'l': 76,
  'o': 79
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: ['DummyText'],
      charPosition: { x: 1, y: 0 },
      mode: MODES.NORMAL_MODE
    }
    document.body.onkeydown = this.handleMovement.bind(this)
  }

  handleMovement(ev) {
    const mapActions = {
      [MODES.NORMAL_MODE]: {
        [KEY_CODES['l']]: () =>
          !this.state.text[this.state.charPosition.y][this.state.charPosition.x + 1]
            ? this.setState({ charPosition: { ...this.state.charPosition, x: this.state.text[this.state.charPosition.y].length - 1 }})
            : this.setState({ charPosition: { ...this.state.charPosition, x: this.state.charPosition.x + 1 }}),
        [KEY_CODES['h']]: () =>
          !this.state.text[this.state.charPosition.y][this.state.charPosition.x - 1]
            ? this.setState({ charPosition: { ...this.state.charPosition, x: 0 }})
            : this.setState({ charPosition: { ...this.state.charPosition, x: this.state.charPosition.x - 1 }}),
        [KEY_CODES['k']]: () =>
          this.state.text[this.state.charPosition.y - 1] && this.setState({ charPosition: { ...this.state.charPosition, y: this.state.charPosition.y - 1 }}),
        [KEY_CODES['j']]: () =>
          this.state.text[this.state.charPosition.y + 1] && this.setState({ charPosition: { ...this.state.charPosition, y: this.state.charPosition.y + 1 }}),
        /* These guys go to insert mode aftwerwards */
        [KEY_CODES['o']]: () => this.setState({ text: this.state.text.concat('¬'), charPosition: { ...this.state.charPosition, y: this.state.charPosition.y + 1 } }),
        [KEY_CODES['O']]: () => this.setState({ text: ['¬', ...this.state.text], charPosition: { ...this.state.charPosition, y: this.state.charPosition.y - 1 } })
      }
    }
    return mapActions[this.state.mode][ev.keyCode] && mapActions[this.state.mode][ev.keyCode]()
  }

  render() {
    return (
      <div className="App">
        {this.state.text.map((line, key) => (
          <Line key={key} text={line} isActive={key === this.state.charPosition.y} onChar={this.state.charPosition.x}/>
        ))}

      </div>
    );
  }
}

export default App;
