import React, { Component } from 'react'
import Char from './components/char'

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        {'Hello World'.split('').map((char, key) => (
          <Char key={key} value={char} />
        ))}
      </div>
    );
  }
}

export default App;
