import React from 'react';
import ReactDOM from 'react-dom';
import {  store } from './App'

import './index.css';
import App from './App';

const render = () => { ReactDOM.render(<App />, document.getElementById('root')); }
store.subscribe(render)
render()