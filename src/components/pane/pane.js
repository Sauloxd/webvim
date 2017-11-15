import React from 'react'
import PropTypes from 'prop-types'
import Line from '../line'
import './pane.css'
import Footer from '../footer'

const commonStyle = 'pane'

const concatStyles = styles => styles.reduce((res, style) => `${res} ${style}`, '')
const Pane = ({ index, text, cursor, active, mode }) => {
  const className = concatStyles(
    [commonStyle]
      .concat(active ? '--active' : [])
  )

  return (
    <div className={className}>
      {text.map((line) => (
        <Line key={index.join('-') + line.index} line={line} isActive={line.index === cursor.y} onChar={cursor.x}/>
      ))}
      <Footer mode={mode} text={text} cursor={cursor} active={active}/>
    </div>
  )
}

Pane.propTypes = {
  index: PropTypes.array,
  text: PropTypes.array,
  cursor: PropTypes.object,
  active: PropTypes.bool,
  mode: PropTypes.string
}

export default Pane