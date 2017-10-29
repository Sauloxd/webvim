import React from 'react'
import PropTypes from 'prop-types'
import './footer.css'

const Footer = ({ cursor }) => {
  return (
    <div className={'footer__container'}>
      <div className={'footer__status__container'}>
        <div className={'footer__vim-mode arrow-right'}> NORMAL </div>
        <div className={'footer__login-status arrow-right'}> Saulo Furuta </div>
        <div className={'footer__file-name'}> tutorial.md </div>
        <div className={'footer__file-status arrow-left'}> 24% 409:3 </div>
      </div>
      <div className={'footer__command__container'}>
      </div>
    </div>
  )
}

Footer.propTypes = {
  cursor: PropTypes.object
}

export default Footer