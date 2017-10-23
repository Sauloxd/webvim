import React, { Component } from 'react'
import Line from './components/line'

import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Line text={'IDONTHAVEASEPARATOR'} />
      </div>
    );
  }
}

export default App;
