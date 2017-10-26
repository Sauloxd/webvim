/*eslint no-mixed-operators: off*/
import React from 'react'
import PropTypes from 'prop-types'
import Char from '../char'
import './line.css'

const Line = ({ isActive, line, onChar }) => {
  const isCharActive = char => {
    if (isActive && (onChar === char.index || line[0] && line[0].value === ' ')) {
      // console.log('oNchar ', onChar)
      // console.log('char ', char)
      // console.log('line ', line)
    }
    return isActive && (onChar === char.index || line[0] && line[0].value === ' ')
  }

  return (
    <div className={(isActive && 'line__cntr --active') || 'line__cntr'} >
      {line.map(char => (
        <Char key={char.index} value={char.value} isActive={isCharActive(char)} />
      ))}
    </div>
  )
}

Line.propTypes = {
  line: PropTypes.array,
  isActive: PropTypes.bool,
  onChar: PropTypes.number
}

export default Line