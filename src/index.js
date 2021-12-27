import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import GameService from './views/GameService/GameService';
import StartView from './views/StartView/StartView';
import Lobby from './views/Lobby/Lobby';
import {BrowserRouter, Routes, Route} from 'react-router-dom';


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartView />}/>
        <Route path="lobby/:id" element={<Lobby />}/>
        <Route path="game" element={<GameService />}>
          <Route path=":id" element={<GameService />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
