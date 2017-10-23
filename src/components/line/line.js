import React from 'react'
import PropTypes from 'prop-types'
import Char from '../char'
import './line.css'

const Line = ({ isActive, text, onChar }) => (
  <div className={(isActive && 'line__cntr --active') || 'line__cntr'} >
    {text.split('').map((char, key) => (
      <Char key={key} value={char} isActive={isActive && (onChar === key || text === '¬')} />
    ))}
  </div>
)

Line.propTypes = {
  text: PropTypes.string,
  isActive: PropTypes.bool,
  onChar: PropTypes.number
}

export default Line