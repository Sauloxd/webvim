import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { createStore } from 'redux'
import { isEmpty } from 'lodash'
import { SOURCE } from './constants'
import Pane from './components/pane'
import Layout from './components/layout'
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

  renderPanes(layout, mode) {
    const findLayoutLeaves = node => {
      if (node.type !== 'pane' && isEmpty(node.value)) throw new Error('Error when trying to find leaves on layout tree!', node)
      if (node.type === 'pane') return <Pane mode={mode} key={node.index.join('-')} active={node.active} index={node.index} text={node.text} cursor={node.cursor} />
      // Fix this
      return (
        <Layout type={node.type}>
          {
            node.value.map(findLayoutLeaves)
          }
        </Layout>
      )
    }

    return findLayoutLeaves(layout)
  }

  render() {
    const { mode, layout } = store.getState()

    return (
      <div>
        {
          this.renderPanes(layout, mode)
        }
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
