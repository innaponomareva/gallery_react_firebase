import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import { HashRouter } from 'react-router-dom'
import { PhotoState } from './context/photo/photoState';
import { AlertState } from './context/alert/alertState';

ReactDOM.render(
  <AlertState>
    <PhotoState>
      <HashRouter>
        <App />
      </HashRouter>
    </PhotoState>
  </AlertState>,
  document.getElementById('root')
);
