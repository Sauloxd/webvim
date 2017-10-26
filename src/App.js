/*eslint no-mixed-operators: off*/
import React, { Component } from 'react'
import { createStore } from 'redux'
import Pane from './components/pane'
import './App.css'

const MODES = {
  INSERT_MODE: 'insert_mode',
  NORMAL_MODE: 'normal_mode'
}

const ACTIONS = {
  MOVEMENT: 'MOVEMENT',
  EDITOR: 'EDITOR'
}

const formatText = text => text.split('\n').map((line, index) => ({ index, value: line }))
const getCurrentLine = state => state.text.find(({ index }) => state.cursor.y === index)
const checkIfHasLineOn = (type, state) => {
  if (!['previous', 'next'].includes(type)) throw new Error('Invalid cursor position type')

  return {
    previous: state.text[state.cursor.y - 1],
    next: state.text[state.cursor.y + 1]
  }[type]
}

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

const checkIfCharIs = (type, state) => {
  const currentLine = getCurrentLine(state)
  if (!currentLine) return false
  if (!['first', 'last'].includes(type)) throw new Error('Invalid cursor position type')

  return {
    first: !currentLine.value[state.cursor.x - 1],
    last: !currentLine.value[state.cursor.x + 1],
  }[type]
}

const movement = (state = {
  text: formatText('What are you doing here\nGo Away!'),
  cursor: { x: 1, y: 0 },
  mode: MODES.NORMAL_MODE
} , action) => {
  const { cursor, text } = state

  const handlerMapper = {
    [ACTIONS.MOVEMENT]: {
      l: {...state, cursor: { ...cursor, x: checkIfCharIs('last', state) ? getCurrentLine(state).value.length - 1 : cursor.x + 1 }},
      h: {...state, cursor: { ...cursor, x: checkIfCharIs('first', state) ? 0 : cursor.x - 1 }},
      k: checkIfHasLineOn('previous', state) && {...state, cursor: { ...cursor, y: cursor.y - 1 }},
      j: checkIfHasLineOn('next', state) && {...state, cursor: { ...cursor, y: cursor.y + 1 }},
    },
    [ACTIONS.EDITOR]: {
      o: {...state, text: addLineBellow({ text, currentCursor: cursor }), cursor: { ...cursor, y: cursor.y + 1 } },
      O: {...state, text: addLineAbove({ text, currentCursor: cursor }), cursor: { ...cursor, y: cursor.y } }
    }
  }

  return handlerMapper[action.type] && handlerMapper[action.type][action.value.key] || state
}
const store = createStore(movement)

class App extends Component {
  componentDidMount() {
    console.log('sending this')
    document.body.onkeydown = ev => { store.dispatch({ type: ACTIONS.MOVEMENT, value: ev }) }
  }

  componentWillUnmount() {
    document.body.onkeydown = () => {}
  }

  render() {
    return (
      <div>
        <Pane text={store.getState().text} cursor={store.getState().cursor}/>
      </div>
    )
  }
}

export default App
export { store }
