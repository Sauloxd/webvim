import React from 'react'
import PropTypes from 'prop-types'
import Line from '../line'
import './pane.css'

const Pane = ({ text, cursor }) => {
  return (
    <div>
      {text.map((line) => (
        <Line key={line.index} line={line} isActive={line.index === cursor.y} onChar={cursor.x}/>
      ))}
    </div>
  )
}

Pane.propTypes = {
  text: PropTypes.array,
  cursor: PropTypes.object
}

export default Pane