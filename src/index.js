import React from 'react';
import ReactDOM from 'react-dom';
import { store } from './App'

import './index.scss';
import App from './App';

const render = () => { ReactDOM.render(<App />, document.getElementById('root')); }
store.subscribe(render)
render()