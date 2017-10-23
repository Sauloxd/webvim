import React from 'react'
import PropTypes from 'prop-types'
import './char.css'

const Char = ({ value }) => (
  <div className='char__cntr'> {value} </div>
)

Char.propTypes = {
  value: PropTypes.string
}
export default Char