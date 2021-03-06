import React from 'react'
import PropTypes from 'prop-types'
import './footer.scss'

const textPercentage = (text, cursor) => Math.ceil((cursor.y + 1) * 100 / text.length)

const Footer = ({ text, cursor, active, mode, fileName }) => {
  return (
    <div className={'footer__container'}>
      <div className={'footer__status__container'}>
        { active && <div className={'footer__vim-mode arrow-right'}> {mode.toUpperCase()} </div> }
        { active && <div className={'footer__login-status arrow-right'}> Saulo Furuta </div> }
        <div className={'footer__file-name'}> {fileName} </div>
        <div className={'footer__file-status arrow-left'}> {textPercentage(text, cursor)}% {cursor.y}:{cursor.x} </div>
      </div>
      <div className={'footer__command__container'}>
      </div>
    </div>
  )}

Footer.propTypes = {
  text: PropTypes.array,
  cursor: PropTypes.object,
  active: PropTypes.bool,
  mode: PropTypes.string,
  fileName: PropTypes.string,
}

export default Footer