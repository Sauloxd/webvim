import React, { Component } from 'react'
import Line from './components/line'

import './App.css'

const MODES = {
  INSERT_MODE: 'insert_mode',
  NORMAL_MODE: 'normal_mode'
}

const formatText = text => text.split('\n').map((line, index) => ({ index, value: line }))

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: formatText('What are you doing here\nGo Away!'),
      cursor: { x: 1, y: 0 },
      mode: MODES.NORMAL_MODE
    }
    document.body.onkeydown = this.handleMovement.bind(this)
  }

  checkIfCharIs(type) {
    const currentLine = this.getCurrentLine()
    if (!currentLine) throw new Error('Cursor in invalid Y position!')
    if (!['first', 'last'].includes(type)) throw new Error('Invalid cursor position type')

    return {
      first: !currentLine.value[this.state.cursor.x - 1],
      last: !currentLine.value[this.state.cursor.x + 1],
    }[type]
  }

  checkIfHasLineOn(type) {
    if (!['previous', 'next'].includes(type)) throw new Error('Invalid cursor position type')

    return {
      previous: this.state.text[this.state.cursor.y - 1],
      next: this.state.text[this.state.cursor.y + 1]
    }[type]
  }


  getCurrentLine() {
    return this.state.text.find(({ index }) => this.state.cursor.y === index)
  }

  handleMovement({ key }) {
    const cursor = this.state.cursor

    const addLineBellow = ({ text, currentCursor: { y } }) => {
      if (text.length - 1 === y) return text.concat({ value: '¬', index: y + 1 })

      return text.reduce((updatedText, line) => {
        if (line.index < y) return updatedText.concat(line)
        if (line.index > y) return updatedText.concat({ ...line, index: line.index + 1 })
        if (line.index === y) return updatedText.concat([line, { value: '¬', index: y + 1 }])
        return updatedText
      }, [])
    }

    const addLineAbove = ({ text, currentCursor: { y } }) =>
      text.reduce((updatedText, line) => {
        if (line.index < y) return updatedText.concat(line)
        if (line.index > y) return updatedText.concat({ ...line, index: line.index + 1 })
        if (line.index === y) return updatedText.concat([{ value: '¬', index: y }, { ...line, index: y + 1 }])

        return updatedText
      }, [])

    const mapActions = {
      [MODES.NORMAL_MODE]: {
        l: () => this.setState({
          cursor: { ...cursor, x: this.checkIfCharIs('last') ? this.getCurrentLine().value.length - 1 : cursor.x + 1 }
        }),
        h: () => this.setState({
          cursor: { ...cursor, x: this.checkIfCharIs('first') ? 0 : cursor.x - 1 }
        }),
        k: () => this.checkIfHasLineOn('previous') && this.setState({ cursor: { ...cursor, y: cursor.y - 1 }}),
        j: () => this.checkIfHasLineOn('next') && this.setState({ cursor: { ...cursor, y: cursor.y + 1 }}),
        /* These guys go to insert mode aftwerwards */
        o: () => this.setState({ text: addLineBellow({ text: this.state.text, currentCursor: cursor }), cursor: { ...cursor, y: cursor.y + 1 } }),
        O: () => this.setState({ text: addLineAbove({ text: this.state.text, currentCursor: cursor }), cursor: { ...cursor, y: cursor.y } })
      }
    }

    return mapActions[this.state.mode][key] && mapActions[this.state.mode][key]()
  }

  render() {
    return (
      <div className="App">
        {this.state.text.map(({ index, value }) => (
          <Line key={index} text={value} isActive={index === this.state.cursor.y} onChar={this.state.cursor.x}/>
        ))}

      </div>
    );
  }
}

export default App;
