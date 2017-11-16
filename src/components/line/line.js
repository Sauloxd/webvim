/*eslint no-mixed-operators: off*/
import React from 'react'
import PropTypes from 'prop-types'
import Char from '../char'
import { store } from '../../reducers/root.reducer'
import { SOURCE } from '../../constants'
import './line.css'

export const CHAR = {
  ACTIVATE: 'char-activate'
}

const activateChar = ({ line, char }) => () => {
  store.dispatch({
    type: SOURCE.MOUSE,
    command: CHAR.ACTIVATE,
    on: {
      line,
      char
    }
  })
}

const Line = ({ isActive, line, onChar }) => (
  <div className={(isActive && 'line__cntr --active') || 'line__cntr'}>
    <div className={'line__index'}>
      { line.index }
    </div>
    <div className={'line__chars'}>
      {line.value.map(char => (
        <Char onClick={activateChar({ line, char })} key={char.index} value={char.value} isActive={isActive && onChar === char.index} />
      ))}
      {
        isActive && onChar >= line.value.length && <Char value={' '} isActive={isActive && onChar >= line.value.length}/>
      }
    </div>
  </div>
)

Line.propTypes = {
  line: PropTypes.object,
  isActive: PropTypes.bool,
  onChar: PropTypes.number
}

export default Line