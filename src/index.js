import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import { PhotoState } from './context/photo/photoState';
import { AlertState } from './context/alert/alertState';

ReactDOM.render(
  <AlertState>
    <PhotoState>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PhotoState>
  </AlertState>,
  document.getElementById('root')
);
