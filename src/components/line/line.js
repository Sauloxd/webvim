/*eslint no-mixed-operators: off*/
import React from 'react'
import PropTypes from 'prop-types'
import Char from '../char'
import './line.css'

const Line = ({ isActive, line, onChar }) => (
  <div className={(isActive && 'line__cntr --active') || 'line__cntr'}>
    <div className={'line__index'}>
      { line.index }
    </div>
    <div className={'line__chars'}>
      {line.value.map(char => (
        <Char key={char.index} value={char.value} isActive={isActive && onChar === char.index} />
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