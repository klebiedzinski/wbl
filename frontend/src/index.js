import React from 'react';
import ReactDOM from 'react-dom/client';
import './Styles/index.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { TeamsContextProvider } from './context/TeamsContext';
import { PlayersContextProvider } from './context/PlayersContext';
import {AuthContextProvider} from './context/AuthContext';
import { GamesContextProvider } from './context/GamesContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <GamesContextProvider>
      <TeamsContextProvider>
        <PlayersContextProvider>
          <BrowserRouter>
              <App />
          </BrowserRouter>
        </PlayersContextProvider>
      </TeamsContextProvider>
      </GamesContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);


