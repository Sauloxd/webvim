import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Char from '../char'
import './line.css'

class Line extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: props.text
    }
  }

  render() {
    return (
      <div>
        {this.state.text.split('').map((char, key) => (
          <Char key={key} value={char} isActive={this.props.onChar === key} />
        ))}
      </div>
    )
  }
}

Line.propTypes = {
  text: PropTypes.string,
  isActive: PropTypes.bool,
  onChar: PropTypes.number
}

export default Line