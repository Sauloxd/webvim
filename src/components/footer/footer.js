import React from 'react'
import PropTypes from 'prop-types'
import './footer.css'

const textPercentage = (text, cursor) => Math.ceil((cursor.y + 1) * 100 / text.length)

const Footer = ({ text, cursor, active, mode }) => {
  return (
    <div className={'footer__container'}>
      <div className={'footer__status__container'}>
        { active && <div className={'footer__vim-mode arrow-right'}> {mode.toUpperCase()} </div> }
        { active && <div className={'footer__login-status arrow-right'}> Saulo Furuta </div> }
        <div className={'footer__file-name'}> tutorial.md </div>
        <div className={'footer__file-status arrow-left'}> {textPercentage(text, cursor)}% {cursor.y}:{cursor.x} </div>
      </div>
      <div className={'footer__command__container'}>
      </div>
    </div>
  )}

Footer.propTypes = {
  text: PropTypes.object,
  cursor: PropTypes.object,
  active: PropTypes.bool,
  mode: PropTypes.string
}

export default Footer