import React from 'react'
import PropTypes from 'prop-types'
import './layout.css'

const Layout = ({ type, children }) => {
  return (
    <div className={'layout layout--' + type}> {children} </div>
  )
}

Layout.propTypes = {
  type: PropTypes.string
}

export default Layout