import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'
import { SOURCE, KEY } from './constants'
import Pane from './components/pane'
import Layout from './components/layout'
import { unregister } from './registerServiceWorker'
import { store } from './reducers'
import './App.css'

class App extends Component {
  componentDidMount() {
    document.body.onkeydown = (() => {
      let keys = []
      let timeout

      const comboKeys = [
        KEY.CTRL.value,
        KEY.SHIFT.value
      ]

      return ev => {
        if (comboKeys.includes(ev.key)) {
          if (!keys.includes(ev.key)) {
            timeout && clearTimeout(timeout);
            timeout = setTimeout(() => { keys = [] }, 500)
            keys.push({ value: ev.key, keyCode: ev.keyCode })
            return
          }
        } else {
          store.dispatch({
            type: SOURCE.KEYBOARD,
            mode: store.getState().mode,
            command: { key: keys.length > 0 ? keys.reduce((comboKey, key) => comboKey + key.value.split('')[0] + '-', '') + ev.key : ev.key, keyCode: keys.length > 0 ? 'CUSTOM' : ev.keyCode }
          })
          keys = []
          timeout && clearTimeout(timeout);
        }
      }
    })()
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
        <Layout key={node.index.join('-')} type={node.type}>
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
