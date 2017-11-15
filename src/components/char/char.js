/*eslint no-mixed-operators: off*/
import React from 'react'
import PropTypes from 'prop-types'
import './char.css'

const activeStyle = '--active'
const commonStyle = 'char__cntr'
const whitespaceStyle = 'char__whitespace'

const concatStyles = styles => styles.reduce((res, style) => `${res} ${style}`, '')

const Char = ({ value, isActive }) => {
  const className = concatStyles(
    [commonStyle]
      .concat(isActive ? activeStyle : [])
      .concat(value === ' ' ? whitespaceStyle : [])
  )

  const charClassName = `char  ${value === ' ' && 'invisible' || ''}`

  /* the ø symbol is a marker for whitespace */
  return (
    <div className={className}> <span className={charClassName}> { value === ' ' ? 'ø' : value } </span> </div>
  )
}

Char.propTypes = {
  value: PropTypes.string,
  isActive: PropTypes.bool
}

export default Char