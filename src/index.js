import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

const START_TIME = 60;

ReactDOM.render(
  <App startTime={START_TIME} />,
  document.getElementById('root')
);
