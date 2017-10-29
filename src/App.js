import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { createStore } from 'redux'
import { SOURCE } from './constants'
import Pane from './components/pane'
import Footer from './components/footer'
import { unregister } from './registerServiceWorker'
import rootReducer from './reducers'
import './App.css'

const store = createStore(rootReducer)

class App extends Component {
  componentDidMount() {
    document.body.onkeydown = ev => { store.dispatch({ type: SOURCE.KEYBOARD, mode: store.getState().mode, command: { key: ev.key, keyCode: ev.keyCode } }) }
  }

  componentWillUnmount() {
    document.body.onkeydown = () => {}
  }

  render() {
    const { text, cursor, mode } = store.getState()

    return (
      <div>
        <Pane text={text} cursor={cursor}/>
        <Footer cursor={cursor} text={text} mode={mode}/>
      </div>
    )
  }
}
App.propTypes = {
  mode: PropTypes.string
}
unregister()
export default App
export { store }
