/*eslint no-mixed-operators: off*/
import React from 'react'
import PropTypes from 'prop-types'
import Char from '../char'
import './line.css'

const Line = ({ isActive, line, onChar }) => (
  <div className={(isActive && 'line__cntr --active') || 'line__cntr'} >
    {line.map(char => (
      <Char key={char.index} value={char.value} isActive={isActive && onChar === char.index} />
    ))}
  </div>
)

Line.propTypes = {
  line: PropTypes.array,
  isActive: PropTypes.bool,
  onChar: PropTypes.number
}

export default Line