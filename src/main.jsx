import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router';
import App from './App';
import { AlertState } from './context/alert/alertState.jsx';
import { PhotoState } from './context/photo/photoState.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AlertState>
      <PhotoState>
        <HashRouter>
          <App />
        </HashRouter>
      </PhotoState>
    </AlertState>
  </StrictMode>
);
