import React from 'react';
import GameService from './views/GameService/GameService';
import StartView from './views/StartView/StartView';
import Lobby from './views/Lobby/Lobby';
import {BrowserRouter, Routes, Route} from 'react-router-dom';


const App = () => (
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<StartView />}/>
                <Route path="lobby/:id" element={<Lobby />}/>
                <Route path="game/:id" element={<GameService/>}/>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
)

export default App;