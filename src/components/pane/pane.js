import React from 'react'
import PropTypes from 'prop-types'
import Line from '../line'
import './pane.css'
import Footer from '../footer'
import { store } from '../../reducers/root.reducer'
import { SOURCE } from '../../constants'

const commonStyle = 'pane'
export const PANE = {
  ACTIVATE: 'pane-activate'
}

const concatStyles = styles => styles.reduce((res, style) => `${res} ${style}`, '')
const Pane = (pane) => {
  const { index, text, cursor, active, mode } = pane
  const className = concatStyles(
    [commonStyle]
      .concat(active ? '--active' : [])
  )

  const activatePane = () => {
    store.dispatch({
      type: SOURCE.MOUSE,
      command: PANE.ACTIVATE,
      on: pane
    })
  }

  return (
    <div className={className} onClick={activatePane}>
      <div className={'pane-scroll'}>
        {text.map((line) => (
          <Line key={index.join('-') + line.index} line={line} isActive={line.index === cursor.y && active} onChar={cursor.x}/>
        ))}
      </div>
      <Footer mode={mode} text={text} cursor={cursor} active={active}/>
      {!active && <div className='pane__overlay'></div>}
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