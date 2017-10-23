import React from 'react'
import PropTypes from 'prop-types'
import './char.css'

const activeStyle = '--active'
const commonStyle = 'char__cntr'

const concatStyles = styles => styles.reduce((res, style) => `${res} ${style}`, '')

const Char = ({ value, isActive }) => (
  <div className={isActive ? concatStyles([commonStyle, activeStyle]) : commonStyle}> { value } </div>
)

Char.propTypes = {
  value: PropTypes.string,
  isActive: PropTypes.bool
}

export default Char